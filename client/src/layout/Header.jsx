import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import setting_icon from "../assets/setting_icon.png";
import user_icon from "../assets/user_icon.png";
import { toggleSettingPopup } from '../store/slices/popUpSlice';

const Header = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(()=>{
       const updateDateTime = ()=>{
          const now = new Date();
          const hours = now.getHours()%12 || 12;
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const ampm = now.getHours() >=12 ? "PM" : "AM";
          setCurrentTime(`${hours}:${minutes}:${ampm}`);

          const options = {month: "short", dat: "numeric", year: "numeric"};
          setCurrentDate(now.toLocaleDateString("en-US", options))
       }
       updateDateTime();
       const intervalId = setInterval(updateDateTime, 1000);
       return ()=> clearInterval(intervalId);
    }, [])
  return (
    <>
    <header className='absolute top-0 bg-white py-4 px-6 w-full left-0 shadow-md flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <img src={user_icon} alt="" className='w-8 h-8'/>
          <div className='flex flex-col'>
            <span className='text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold'>{user && user.name}</span>
            <span className='text-sm font-medium sm:text-lg sm:font-medium'>{user && user.role}</span>
          </div>
        </div>

        <div className='hidden md:flex items-center gap-2'>
          <div className='flex flex-col text-sm lg:text-base items-end font-semibold'>
            <span>{currentTime}</span>
            <span>{currentDate}</span>
          </div>
          <span className='bg-black h-14 w-[2px]'/>
          <img src={setting_icon} alt="settingIcon" className='w-8 h-8' onClick={()=>dispatch(toggleSettingPopup())}/>
        </div>
    </header>
    
    </>
  )
}

export default Header