import NavigatorBar from "@/components/navigatorBar";
import styles from "@/styles/my-account.module.scss";
import { Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { redirect } from "next/dist/server/api-utils";
import Loader from "@/components/loader";
import { useRef, useState } from "react";

export default function MyAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      setLoading(true);
      await signIn("credentials", { redirect: false, email, password })
        .then((data) => {
          if (data.error) {
            setLoading(false);
            toast.error(data.error);
            return;
          }
          setLoading(false);
          toast.success("Başarıyla giriş yapıldı.");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        })
        .catch((data) => {
          toast.error(data.error);

          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const formRef = useRef(null);
  const handleSignUp = async (degerler) => {
    const values = {
      name: degerler.registerFullname,
      email: degerler.registerEmail,
      password: degerler.registerPassword,
      username: degerler.registerUsername,
    };
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        values,
      });
      if (data.user) {
        setLoading(false);
        toast.success(data.message);
        formRef.current.resetFields();
        window.scrollTo({
          top: 800,
          behavior: "smooth",
        });
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={styles.myAccout}>
      <NavigatorBar />
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.myAccount__wrapper}>
          <div className={styles.myAccount__login}>
            <h3>Giriş Yap</h3>
            <div className={styles.myAccount__login_bordered}>
              <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item
                  label="Kullanıcı Adı veya Email"
                  name={"email"}
                  rules={[{ required: true, message: "Zorunlu Alan" }]}
                >
                  <Input placeholder={"Kullanıcı Adı ve Email"} />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[{ required: true, message: "Zorunlu Alan" }]}
                >
                  <Input placeholder={"Şifre"} type="password" />
                </Form.Item>
                <Form.Item name={"remember"}>
                  <Checkbox> Beni Hatırla</Checkbox>
                </Form.Item>
                <button className={styles.primary_button} type="submit">
                  Giriş Yap
                </button>
              </Form>
            </div>
          </div>
          <div className={styles.myAccount__register}>
            <h3>Kaydol</h3>
            <div className={styles.myAccount__login_bordered}>
              <Form ref={formRef} layout="vertical" onFinish={handleSignUp}>
                <Form.Item
                  label="Kullanıcı Adı"
                  rules={[{ required: true, message: "Zorunlu alan" }]}
                  name="registerUsername"
                >
                  <Input placeholder={"Kullanıcı Adı"} />
                </Form.Item>
                <Form.Item
                  label="Ad Soyad"
                  rules={[{ required: true, message: "Zorunlu alan" }]}
                  name="registerFullname"
                >
                  <Input placeholder={"Kullanıcı Adı"} />
                </Form.Item>
                <Form.Item
                  label="Email"
                  rules={[{ required: true, message: "Zorunlu alan" }]}
                  name="registerEmail"
                >
                  <Input placeholder={"Email"} />
                </Form.Item>
                <Form.Item
                  label="Şifre"
                  rules={[{ required: true, message: "Zorunlu alan" }]}
                  name="registerPassword"
                >
                  <Input placeholder={"Şifre"} type="password" />
                </Form.Item>
                <button className={styles.primary_button} type="submit">
                  Kaydol
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
