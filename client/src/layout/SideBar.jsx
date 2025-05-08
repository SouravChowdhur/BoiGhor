import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import logo_with_title from "../assets/logo_with_title.png";
import dashboard_icon from "../assets/dashboard_icon.jpg";
import book_icon from "../assets/book_icon.png";
import { RiAdminFill } from "react-icons/ri";
import setting_icon from "../assets/setting_icon.png";
import logout_icon from "../assets/logout_icon.jpeg";
import close_icon from "../assets/close_icon.png"
import { toggleAddNewAdminPopup, toggleSettingPopup } from '../store/slices/popUpSlice';
import catalog_icon from "../assets/catalog_icon.jpeg";
import user_icon from "../assets/user_icon.png";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";
import {useNavigate} from "react-router-dom"

const SideBar = ({ isSidebarOpen, setIsSidebarOpen, setSelectedComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {addNewAdminPopup, settingPopup} = useSelector(state => state.popup);
  const { user, isAuthenticated, loading, error, message } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthSlice());
    navigate("/login");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, error, loading, message]);
  return (
    <>
      <aside className={`${isSidebarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-white text-orange-600 flex-col h-full`} style={{ position: "fixed" }}>
        <div className='px-6 py-4 my-8'>
          <img src={logo_with_title} alt="logo" className="h-14 w-14" />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashboard")}>
            <img src={dashboard_icon} alt="" className="h-10 w-10" /> <span>Dashboard</span>
          </button>
          <button className="w-full py-2 font-medium b g-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Books")}>
            <img src={book_icon} alt="" className="h-10 w-10" /> <span>Books</span>
          </button>
        {
          isAuthenticated && user?.role == "Admin" && ( 
              <>
                <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Catalog")}>
                  <img src={catalog_icon} alt="" className="h-12 w-12" /> <span>Catalog</span>
                </button>
                <button className="w-full py-2 font-medium b g-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Users")}>
                  <img src={user_icon} alt="" className="h-12 w-12" /> <span>Users</span>
                </button>
                <button className="w-full py-2 font-medium b g-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={()=> dispatch(toggleAddNewAdminPopup())}>
                  <RiAdminFill className='h-6 w-6' /> <span>Add New Admin</span>
                </button>
              </>
            )
          }

          
            {isAuthenticated && user?.role == "User" && ( 
            <>
                <button className="w-full py-2 font-medium b g-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("My Borrowed Books")}>
                  <img src={catalog_icon} alt="icon" className="h-12 w-12" /> <span>My Borrowed Books</span>
                </button>
               </>
            )
          }

          <button className="md:hidden w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={()=>dispatch(toggleSettingPopup())}>
            <img src={setting_icon} alt="icon" className="h-10 w-10" /> <span>Update Credentials</span>
          </button>
        </nav>
        <div className='px-6 py-4'>
          <button className='py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex justify-center items-center space-x-2 mx-auto w-fit' onClick={handleLogout} >
            <img src={logout_icon} alt="icon" className="h-6 w-6" /><span>Log Out</span>
          </button>
        </div>
        <img src={close_icon} alt="icon" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className=' absolute top-0 right-4 mt-4 block md:hidden h-6 w-6'/>
      </aside>
       {addNewAdminPopup && <AddNewAdmin/>}
       {settingPopup && <SettingPopup/>}
    </>
  )
}

export default SideBar