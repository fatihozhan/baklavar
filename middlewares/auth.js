import { getToken } from "next-auth/jwt";

export async function Auth(req, res, next) {
  const token = await getToken({
    req,
    secret: process.env.SECRET_KEY,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (token) {
    //signed in
    req.user = token.sub;
    next();
  } else {
    return res.status(401).json({ message: "Lütgen Giriş Yapınız." });
  }
}
