import Inputs from "@/components/input";
import NavigatorBar from "@/components/navigatorBar";
import styles from "@/styles/my-account.module.scss";
import { Checkbox, Form } from "antd";

export default function MyAccount() {
  return (
    <div className={styles.myAccout}>
      <NavigatorBar />
      <div className={styles.container}>
        <div className={styles.myAccount__wrapper}>
          <div className={styles.myAccount__login}>
            <h3>Giriş Yap</h3>
            <div className={styles.myAccount__login_bordered}>
              <Form layout="vertical">
                <Form.Item
                  label="Kullanıcı Adı ve Email"
                  name={"username"}
                  rules={[{ required: true, message: "Zorunlu Alan" }]}
                >
                  <Inputs placeholder={"Kullanıcı Adı ve Email"} />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[{ required: true, message: "Zorunlu Alan" }]}
                >
                  <Inputs placeholder={"Şifre"} type="password" />
                </Form.Item>
                <Form.Item
                  name={"button"}
                >
                    <button className={styles.primary_button}>Giriş Yap</button>
                    <Checkbox> Beni Hatırla</Checkbox>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.myAccount__register}>
            <h3>Kaydol</h3>
            <div className={styles.myAccount__login_bordered}>
              <Form layout="vertical">
                <Form.Item label="Kullanıcı Adı" rules={[{required : true , message : "Zorunlu alan"}]} name="registerUsername" >
                  <Inputs placeholder={"Kullanıcı Adı"} name="registerUsername"/>
                </Form.Item>
                <Form.Item label="Email" rules={[{required : true , message : "Zorunlu alan"}]} name="registerEmail" >
                  <Inputs placeholder={"Email"} name="registerEmail"/>
                </Form.Item>
                <Form.Item label="Şifre" rules={[{required : true , message : "Zorunlu alan"}]} name="registerPassword" >
                  <Inputs placeholder={"Şifre"} type="password" name="registerPassword"/>
                </Form.Item>
                <button className={styles.primary_button}>Kaydol</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
