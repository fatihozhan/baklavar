import styles from "./styles.module.scss";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { Popover } from "antd";

export default function AddressCard({
  address,
  showModal,
  setLoading,
  setCurrentUser,
  cities,
  currentUser,
}) {
  const deleteAddress = async (id) => {
    try {
      setLoading(true);
      await axios
        .delete("/api/users/updateUser", { data: { id, address: "silme" } })
        .then(({ data }) => {
          setCurrentUser(data.user);
          toast.success(data.message);
          setLoading(false);
        })
        .catch(({ data }) => {
          setLoading(false);
          toast.error(data.message);
          console.log(data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const addressActived = async (addressUpdate) => {
    setLoading(true);
    addressUpdate.active = true;
    const values = { addressUpdate, email: currentUser.email };
    try {
      await axios
        .post("/api/users/updateUser", { values })
        .then((data) => {
          setCurrentUser(data.data.user);
          setLoading(false);
        })
        .catch((data) => {
          console.log(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  
  return (
    <div className={`${styles.address} ${address.active ? styles.active : ""}`}>
      <div className={styles.address__title}>{address.title}</div>
      <Popover
        content={
          address.active ? (
            <div> Varsayılan adres</div>
          ) : (
            <div>Varsayılan adres olarak kullanmak için tıklayınız...</div>
          )
        }
        trigger="hover"
      >
        <div
          className={styles.address__infos}
          onClick={() => addressActived(address)}
        >
          <b> {address.firstName + " " + address.lastName} </b>
          <p> {address.mahalle} </p>
          <p> {address.address1} </p>
          <p>{address.state + "/" + address.city}</p>
          <p> {address.phoneNumber} </p>
        </div>
      </Popover>

      <div className={styles.address__footer}>
        <div onClick={() => deleteAddress(address._id)}>
          <BsTrash /> <b>Sil</b>
        </div>
        <div>
          <button
            onClick={() => showModal(address)}
            className={styles.secondary_button}
          >
            Adresi Düzenle
          </button>
        </div>
      </div>
    </div>
  );
}
