import db from "@/utils/db";
import fs from "fs";
import bcrypt from "bcrypt";
import User from "@/models/User";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import { Auth } from "@/middlewares/auth";

const handler = nc({
  /*   onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  }, */
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(Auth)
  .post(async (req, res) => {
    const {
      values: {
        username,
        email,
        picture,
        fullname,
        newPassword,
        oldPassword,
        payment,
        role,
        wishlist,
        addresses,
        addressUpdate,
        id,
        isAdmin,
      },
    } = req.body;
    await db.connectDb();
    if (isAdmin) {
      const user = await User.findById(id);
      user.role = user.role == "admin" ? "user" : "admin";
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Kullancı güncellendi" });
    }
    const user = await User.findOne({ email });
    if (wishlist) {
      if (user.wishlist.find((wish) => wish.product == id)) {
        const index = user.wishlist.indexOf(
          user.wishlist.find((wish) => wish.product == id)
        );
        if (index > -1) {
          user.wishlist.splice(index, 1);
        }
      } else {
        user.wishlist.push({
          product: id,
        });
      }
    }

    let uzanti;
    if (picture) {
      uzanti = picture.slice(0, 25).includes("data:image/jpeg;base64,/")
        ? picture.substring(0, 23)
        : picture.substring(0, 22);
      uzanti = uzanti.slice(11).split(";")[0];

      const base64Data = picture
        .slice(0, 25)
        .includes("data:image/png;base64,/")
        ? picture.replace(/^data:image\/png;base64,/, "")
        : picture.slice(0, 25).includes("data:image/jpg;base64,/")
        ? picture.replace(/^data:image\/jpg;base64,/, "")
        : picture.slice(0, 25).includes("data:image/jpeg;base64,/")
        ? picture.replace(/^data:image\/jpeg;base64,/, "")
        : picture.replace(/^data:image\/gif;base64,/, "");

      fs.writeFileSync(
        `${process.cwd()}/public/images/users/${user._id}.${uzanti}`,
        base64Data,
        "base64",
        (err) => console.log(err)
      );
    }

    if (oldPassword && !newPassword) {
      await db.disconnectDb();
      return res
        .status(404)
        .json({ error: true, message: "Yeni şifrenizi giriniz." });
    }
    if (newPassword) {
      if (!oldPassword) {
        await db.disconnectDb();
        return res.status(404).json({ error: "Eski şifreniz doğru değil." });
      }
      const oldPassTest = await bcrypt.compare(oldPassword, user.password);
      if (!oldPassTest) {
        await db.disconnectDb();
        return res.status(404).json({ error: "Eski şifreniz doğru değil." });
      }
    }
    if (addresses) {
      if (user.addresses.length > 3) {
        return res
          .status(500)
          .json({ error: true, message: "Adres sayınız 6'ten fazla olamaz" });
      }
      user.addresses.map((addr) => (addr.active = false));
      user.addresses.push({
        firstName: addresses.name,
        lastName: addresses.surname,
        phoneNumber: addresses.phone,
        address1: addresses.adres,
        mahalle: addresses.mahalle,
        zipCode: addresses.zipCode,
        city: addresses.city,
        state: addresses.ilce,
        title: addresses.baslik,
        active: true,
      });
    }
    if (addressUpdate) {
      user.addresses.map((address) => {
        if (address._id == addressUpdate._id) {
          addressUpdate.active &&
            user.addresses.map((address) => (address.active = false));
          address.firstName = addressUpdate.name
            ? addressUpdate.name
            : address.firstName;
          address.lastName = addressUpdate.surname
            ? addressUpdate.surname
            : address.lastName;
          address.phoneNumber = addressUpdate.phone
            ? addressUpdate.phone
            : address.phoneNumber;
          address.address1 = addressUpdate.adres
            ? addressUpdate.adres
            : address.address1;
          address.city = addressUpdate.city ? addressUpdate.city : address.city;
          address.state = addressUpdate.ilce
            ? addressUpdate.ilce
            : address.state;
          address.mahalle = addressUpdate.mahalle
            ? addressUpdate.mahalle
            : address.mahalle;
          address.zipCode = addressUpdate.zipCode
            ? addressUpdate.zipCode
            : address.zipCode;
          address.title = addressUpdate.baslik
            ? addressUpdate.baslik
            : address.title;
          address.active = addressUpdate.active
            ? addressUpdate.active
            : address.active;
        }
      });
    }

    user.email = email ? email : user.email;
    user.name = fullname ? fullname : user.name;
    user.password = newPassword
      ? await bcrypt.hash(newPassword, 8)
      : user.password;
    user.image = uzanti ? `/images/users/${user._id}.${uzanti}` : user.image;
    user.username = username ? username : user.username;
    user.defaultPaymentMethod = payment ? payment : user.defaultPaymentMethod;
    user.role = role ? role : user.role;
    const newUser = await user.save();

    delete newUser.password;
    delete newUser.__v;
    delete newUser.role;
    await db.disconnectDb();
    return res.status(200).json({
      success: true,
      message: "Bilgileriniz güncellendi.",
      user: newUser,
    });
  })
  .delete(async (req, res) => {
    const session = await getSession({ req });
    const { address, id, deleteUser } = req.body;
    await db.connectDb();

    if (deleteUser) {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        await db.disconnectDb();
        return res
          .status(200)
          .json({ success: true, message: "Kullanıcı Silindi." });
      }
    }
    if (address == "silme") {
      const user = await User.findByIdAndUpdate(
        session.user.id,
        {
          $pull: { addresses: { _id: id } },
        },
        {
          new: true,
        }
      );
      if (
        user.addresses.length > 0 &&
        !user.addresses.find((addr) => addr.active)
      ) {
        user.addresses[user.addresses.length - 1].active = true;
        await user.save();
      }
      await db.disconnectDb();
      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "Kullanıcı bulunamadı." });
      }
      delete user.password;
      return res
        .status(200)
        .json({ user, success: true, message: "Adres Silindi." });
    }
    return res
      .status(500)
      .json({ error: true, message: "Bir hata meydana geldi" });
  });

export default handler;
