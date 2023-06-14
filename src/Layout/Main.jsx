import { Outlet } from "react-router-dom";
import Nav from "../Pages/Shared/NavBar/Nav";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className=" mx-auto max-w-screen-2xl">
      <Nav></Nav>
      <div className=" mt-24">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
