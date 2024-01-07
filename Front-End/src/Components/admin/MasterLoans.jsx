import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import '../../Css/MasterBooks.css';
import logo from '../../Assets/logo-white.png';
import logo2 from '../../Assets/logo-main.png';
import notif from '../../Assets/Notif.png';
import profil from '../../Assets/Profil.png';
import { jwtDecode } from 'jwt-decode';

import searchIcon from '../../Assets/search2.png';
import {BiEdit} from 'react-icons/bi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LiaUsersCogSolid } from "react-icons/lia";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LuBookPlus } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

const MasterBuku = () => {
  const [isVerif, setIsVerif] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshToken();    
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
  
  const navigate = useNavigate();  
  const [activeIndex] = useState(1);
  const [navVisible, showNavbar] = useState(false);
  const [imgVisible, showImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({name: ''});
  const [token, setToken] = useState('');
  const [books, setBooks] = useState([]);
  const [expire, setExpire] = useState('');
  const [searchText, setSearchText] = useState('');
  
  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:8000/token');
      const firstToken = response.data.accessToken;  
      await getName(firstToken);
      const decoded = jwtDecode(firstToken);
      setExpire(decoded.exp);
  } catch (error) {
    navigate('/');
    setIsVerif(false);
  }
};
  
  const getName = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/uservalidation', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });  
      const userData = response.data.user;
      if(userData.role_id!=1){
        navigate(-1);
        setIsVerif(false);
      }
      else{
        setIsVerif(true);
        setName({
          name : userData.name,
        });
        handleTicket('',token);
        setToken(token);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching User Detail:', error);
      setLoading(false);
    }
  }; 
  let varnewToken = token;
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get('http://localhost:8000/token');
          const newToken = response.data.accessToken;
          varnewToken = newToken;
          config.headers.Authorization = `Bearer ${newToken}`;
          setToken(newToken);
          const decoded = jwtDecode(newToken);
          setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });
  
  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    handleTicket(searchValue, token);
  };

  const handleTicket = async (searchValue, token) => {
    setLoading(true); // Set loading to true to indicate that data is being fetched.
    await axiosJWT.get(`http://localhost:8000/fetchloans?search=${searchValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    )
      .then((response) => {
        setBooks(response.data.user);
        console.log(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
        setLoading(false); 
      });
  };

  const handleDelete = async (id) => {
    // Ask for confirmation
    const confirmResult = await Swal.fire({
      title: 'Are you sure to delete this row?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true, // Reverse the order of buttons
      customClass: {
        popup: 'swal2-popup-right', // Add your custom CSS class for positioning
      },
    });
  
    // If the user confirms, proceed with the deletion
    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosJWT.delete(`http://localhost:8000/deleteloan/${id}`, {
          headers: {
            Authorization: `Bearer ${varnewToken}`,
          },
        });
  
        if (response.status === 200 && response.data.success) {
          handleTicket(searchText, token);
        } else if (response.status === 404) {
          console.error(response.data.message);
        } else {
          console.error('Failed to delete book');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };
  
  const Logout = async () => {
    try {
        await axios.delete('http://localhost:8000/logout');
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  }
  
  const sidebarNavItems = [
    {
      display: "Books",
      icon: <LuBookMarked className='navbar-icon' />,
      to: '/books-master',
    },
    {
      display: "Loans",
      icon: <LuBookPlus className='navbar-icon' />,
      to: '/loans-master',
    },
    {
      display: "Users",
      icon: <LiaUsersCogSolid className='navbar-icon' />,
      to: '/users-master',
    },
    {
      display: "Logout",
      icon: <LuLogOut className='navbar-icon' />,
      onClick: Logout
    }
  ];

  const Logo = () => (
    <div className="logo4">
      <img src={logo} alt="logo4" />
    </div>
  );
  const Logo2 = () => (
    <div className="logo5">
      <img src={logo2} alt="logo5" />
    </div>
  );

  
  return (
    (isVerif === true) ?
    <>
    <main className={navVisible ? 'space-toggle' : ''}>
      <header className={`main-nav ${navVisible ? 'space-toggle' : ''}`}>
        <div className='header-toggle' onClick={() => showNavbar(!navVisible)}>
            <button
              className="mobile-nav-btn"
              onClick={() => showImg(!imgVisible)}
            >
              {imgVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <button
              className="mobile-nav-btn2"
              onClick={() => showNavbar(!navVisible)}
            >
              {navVisible ? <FaTimes size={24}/>  : <FaBars size={24} />}
            </button>
        </div>
        <div className='header-content flex items-center'>
            <img className="imga" src={notif} alt="" />
            <img className="imga" src={profil} alt="" />
            <p className='text-white '>{name.name}</p>
        </div>
      </header>
      <nav className={!navVisible ? 'sidebar' : ''}>
      <div className="sidebar__logo">
        {navVisible ? <Logo /> : <Logo2 />}
        </div>
        <div className="sidebar__menu">
          <div className="sidebar__menu__indicator"></div>
          {sidebarNavItems.map((item, index) => (
            <Link onClick={item.onClick} to={item.to} key={index}>
              <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                <div className="sidebar__menu__item__icon">
                  {item.icon}
                </div>
                <div className="sidebar__menu__item__text">
                  {item.display}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <div id={imgVisible ? 'overlay' : ''}></div>
      <div className='content'>
       <div className='flex items-baseline headline'>
          <h1 className='font-semibold text-ticket'>Loans</h1>
          <h2 className='font-medium ml-2 text-overview'>Master</h2>
        </div>
          <div className='flex flex-col items-center justify-content-center'>
              <div className='whiteadmin-box mt-1 shadow-lg'>
                  <div className='flex mt-2 px-4'>
                      <div className="relative">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg py-1 px-10 w-48 md:w-80 text-lg"
                        placeholder="Search Title..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                      />
                          <img
                              src={searchIcon}
                              alt="Search"
                              className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 mt-1"
                          />
                      </div>
                      <div className='flex gap-2 ml-[auto]'>
                        <div  onClick={() => navigate('/loans-new')}  className='ml-6 flex  items-center justify-center rounded-md mt-2 text-base font-semibold px-4 w-32 text-white cursor-pointer btn-NewTicket'>
                          Add Loan
                        </div>
                      </div>     
                  </div>
                  <div className='table-content mt-5'>
                      <table className="table-auto w-full border-gray-300 tabel">
                      <thead className='border-box'>
                        <tr key="column">
                          <th className="w-12 px-1 py-2 text-sm font-semibold">ID</th>
                          <th className="w-72 px-4 py-2 text-sm font-semibold">Title</th>
                          <th className="w-48 px-4 py-2 text-sm font-semibold">Borrower</th>
                          <th className="w-24 px-4 py-2 text-sm font-semibold">Loan Date</th>
                          <th className="w-24 px-4 py-2 text-sm font-semibold">Status</th>
                          <th className="w-32 px-2 py-2 text-sm font-semibold">Action</th>
                        </tr>
                      </thead>
                          <tbody>
                          {loading ? (
                            <tr key="loading">
                              <td colSpan="11" className='text-center allert-result'>Loading...</td>
                            </tr>
                          ) : books && books.length > 0 ? (
                            books.map((books, index) => (
                              <tr key={books.TicketId}>
                                  <td className="px-1 py-1 text-sm font-semibold text-center">{books.id}</td>
                                  <td className="px-1 py-1 text-sm text-center">{books.title}</td>
                                  <td className="px-1 py-1 text-sm text-center">
                                    <p className="px-1 py-1 text-sm text-center">{books.borrower}</p>
                                  </td>
                                  <td className='px-1 py-1 text-sm text-center'>
                                      {books.date_created}
                                  </td>
                                  <td className="px-1 text-center">
                                      <span className={`text-sm font-semibold flex items-center justify-center text-center py-1 rounded-full ${
                                        books.status && books.status.length > 0
                                          ? books.status.charAt(0) === 'D'
                                            ? "bg-opacity-75 text-green-800 bg-green-200"
                                            : books.status.charAt(0) === 'O'
                                            ? "bg-opacity-75 text-red-900 bg-red-300"
                                            : books.status.charAt(0) === 'R'
                                            ? "bg-opacity-50 text-yellow-800 bg-yellow-200"
                                            : "bg-opacity-75 text-orange-900 bg-orange-300"
                                          : ""
                                      }`}>
                                        {books.status}
                                      </span>
                                    </td>
                                  <td className='px-1 py-1'>
                                    <div className='flex items-center justify-center'>
                                      <span
                                        className="cursor-pointer mr-4"
                                        key={`${books.id}-${index}`}
                                        onClick={() => handleDelete(books.id)}
                                      >
                                        <MdOutlineDeleteForever size={24} color="#9D4E3E" />
                                      </span>
                                      <span
                                        className="cursor-pointer"
                                        key={`${books.id}-${index}-edit`}
                                        onClick={() => {
                                          // Add your second onClick action (e.g., navigate to edit)
                                          navigate(`/loans-edit/${books.id}`);
                                        }}
                                      >
                                        <BiEdit size={20} color="#4F39D8" />
                                      </span>
                                    </div>
                                  </td>
                              </tr>
                                ))) : (
                                <tr key="no-tickets">
                                    <td colSpan="10" className='allert-result text-center'>No books available</td>
                                </tr>
                                )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </div>
      </main>
    </>: ''
  );
}

export default MasterBuku