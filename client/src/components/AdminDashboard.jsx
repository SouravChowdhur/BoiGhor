import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';
import Header from '../layout/Header';
import { FaBook } from 'react-icons/fa';
import { FaUndo } from 'react-icons/fa';
import logo_with_title from "../assets/logo_with_title.png";
import book_icon from "../assets/book_icon.png";
import admin_icon from "../assets/admin_icon.png";
import return_icon from "../assets/return_icon.png";
import browse_icon from "../assets/browse_icon.jpeg";
import { Pie } from "react-chartjs-2";
import user_icon from "../assets/user_icon.png"


ChartJS.register(
  CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter(user => user.role === "User");
    let numberOfAdmins = users.filter(user => user.role === "Admin");
    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);
    let numberOfTotalBorrowedBooks = allBorrowedBooks.filter(book => book.returnedDate === null);
    let numberOfTotalReturnedBooks = allBorrowedBooks.filter(book => book.returnedDate !== null)
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
    setTotalBooks(books.length)
  }, [users, allBorrowedBooks]);


  const data = {
    labels: ['Total Borrowed Books', 'Total Returned Books'],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4
      }
    ]
  }


  return <>

    <main className="relative flex-1 p-6 pt-28">

      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        <div className='flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5'>
          <div className='xl:flex-[4] flex items-end w-full content-center'>
            <Pie data={data} options={{ cutout: 0 }} className='mx-auto lg:mx-0 w-full h-auto' />
          </div>
          <div className='flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg'>
            <img src={logo_with_title} alt="logo" className='w-auto xl:flex-1 rounded-lg' />
            <span className='w-[2px] bg-black h-full'></span>
            <div className='flex flex-col gap-3'>
              <p className='flex items-center gap-3'>
                <span className='w-3 h-3 rounded-full bg-[#3D3E3E]'></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className='flex items-center gap-3'>
                <span className='w-3 h-3 rounded-full bg-[#151619]'></span>
                <span>Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-[4] flex-col gap-7 lg:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]'>
          <div className='flex flex-col-reverse lg:flex-row gap-7 flex-[4]'>
            <div className='flex flex-col gap-7 flerx-1'>
              <div className='flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]'>
                <span className='bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg'>
                  <img src={user_icon} alt="" className='w-8 h-8' />
                </span>
                <span className='w-[2px] bg-black h-20 lg:h-full'></span>
                <div className='flex flex-col items-center gap-2'>
                  <h4 className='font-black text-3xl'>{totalUsers}</h4>
                  <p className='font-light text-gray-700 text-sm'>Total User Base</p>
                </div>
              </div>
              <div className='flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]'>
                <span className='bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg'>
                  <img src={book_icon} alt="" className='w-8 h-8' />
                </span>
                <span className='w-[2px] bg-black h-20 lg:h-full'></span>
                <div className='flex flex-col items-center gap-2'>
                  <h4 className='font-black text-3xl'>{totalBooks}</h4>
                  <p className='font-light text-gray-700 text-sm'>Total Book Count</p>
                </div>
              </div>
              <div className='flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]'>
                <span className='bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg'>
                  <img src={admin_icon} alt="" className='w-8 h-8' />
                </span>
                <span className='w-[2px] bg-black h-20 lg:h-full'></span>
                <div className='flex flex-col items-center gap-2'>
                  <h4 className='font-black text-3xl'>{totalAdmin}</h4>
                  <p className='font-light text-gray-700 text-sm'>Total Admin Count</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row flex-1'>
              <div className='flex flex-col lg:flex-row flex-1 items-center justify-center'>
                <div className='bg-white p-5 rounded-lg shadow-lg h-full flex flex-col justify-center items-center gap-4'>
                  <img src={user && user.avatar?.url} alt="avatar" className='rounded-full h-32 w-32 object-cover' />
                  <h2 className='text-xl 2xl:text-2xl font-semibold text-center'>{user && user.name}</h2>
                  <p className='text-gray-600 text-sm 2xl:text-base text-center'>Welcome to Boighor Admin Panel!
                    You're in control of everything — from books to borrowers.
                    Monitor activity, manage users, and keep things running smoothly.
                    Your role ensures seamless access and reliable service for all.
                    Let's make reading smarter, one admin task at a time!</p>
                </div>
              </div>
            </div>
          </div>
          <div className='hidden xl:flex bg-white p-7 text-lg sm:text-xl xl:text-2xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] justify-center items-center rounded-2xl'>
            <h4 className='overflow-y-hidden'>Welcome to Boighor — your ultimate library management system.
              Manage books, users, and transactions seamlessly with just a few clicks.
              Track borrowed books, their due dates, and monitor book availability.
              Boighor makes it easier for admins to oversee all aspects of the library.
             </h4>
            <p className='text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px]'>~BoiGhor Team</p>
          </div>
        </div>
      </div>
    </main>
  </>


}

export default AdminDashboard