// import Navbar from '../header/navbar'
import Top from "../header/top";

export default function Layout({ children }) {
  return (
    <div>
      {/* <Navbar/> */}
      <Top />
      <main>{children}</main>
    </div>
  );
}
