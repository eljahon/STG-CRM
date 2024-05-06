import { Outlet } from "react-router-dom";
import HeadlessDemo from "./ui/app-topbar/index";
import Header from "./ui/header/index";
import TemplateDemo from "./ui/site-bar/index";

export default function MainLayout() {
  return (
    <div className='flex gap-4 Container h-screen '>
      <TemplateDemo />
      <div className='w-full overflow-scroll sroll'>
        <Header />

        <Outlet />
      </div>
    </div >


  )
}
