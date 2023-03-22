// import Navbar from '../header/navbar'
import Footer from "../footer";
import Top from "../header/top";

export default function Layout({ children }) {
  return (
    <div>
      <Top />
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
