import { Header } from "../components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
