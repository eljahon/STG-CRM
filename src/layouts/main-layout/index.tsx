import { Outlet } from "react-router-dom";
import Header from "./ui/header/index";
import TemplateDemo from "./ui/site-bar/index";

export default function MainLayout() {
  return (
    <div className='flex gap-5 Container' style={{"height":"96vh"}}>
      <TemplateDemo />
      <div className='w-full overflow-scroll sroll'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
