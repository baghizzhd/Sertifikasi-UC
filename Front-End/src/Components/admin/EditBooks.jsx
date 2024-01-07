import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../Css/Loans.css';
import logo from '../../Assets/logo-white.png';
import logo2 from '../../Assets/logo-main.png';
import notif from '../../Assets/Notif.png';
import profil from '../../Assets/Profil.png';
import back from '../../Assets/back.png';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LiaUsersCogSolid } from "react-icons/lia";
import { LuBookMarked } from "react-icons/lu";
import { LuBookPlus } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { jwtDecode } from 'jwt-decode';

const EditBooks = () => {
  const { id } = useParams();
  const [isVerif, setIsVerif] = useState(null);  
  const fetchData = async () => {
    try {
      await refreshToken(); 
    } catch (error) {
      console.log("Error:", error); 
    }
  };
  useEffect(() => {
        fetchData()
  }, []);

  const [activeIndex] = useState(0);
  const navigate = useNavigate();
  const [navVisible, showNavbar] = useState(false);
  const [imgVisible, showImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({name: ''});  
  const [user, setUser] = useState({ id:'', name: '' });  
  const [status, setStatus] = useState({ id:'', name: '' }); 
  const [category, setCategory] = useState({ id:'', name: '' }); 
  const [token, setToken] = useState(null);
  const [expire, setExpire] = useState(null);
  const [loan, setDLoan]  = useState({
    title: '',
    author: '',
    publication:'',
    category_id: '',
    status: ''
  });
  
  const refreshToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/token');
        const firstToken = response.data.accessToken;
        getName(firstToken);
        const decoded = jwtDecode(firstToken);
        setExpire(decoded.exp);
      } catch (error) {
        navigate(-1);
      }
  };

const getCategory = async () => {
    try {
        const response = await axios.get('http://localhost:8000/fetchlistcategories');
        const userData = response.data.user;
        const usersNames = userData.map(user => ({
            id: user.id,
            name: user.name
        }));
        setCategory(usersNames); 
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
};

const getStatus = async () => {
    try {
        const response = await axios.get('http://localhost:8000/fetchbookstatus');
        const userData = response.data.user;
        const usersNames = userData.map(user => ({
            id: user.id,
            name: user.name
        }));
        setStatus(usersNames); 
        setLoading(false);
    } catch (error) {
        setLoading(false);
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
      setIsVerif(false);
      navigate(-1);
    }
    else{
      setIsVerif(true);
      setName({
        name : userData.name,
      });
      getCategory();
      getStatus();
      setToken(token);
      getData(token);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
}; 

const getData = async (token) => {
    try {
      // Fetch ticket details based on the id
      const response = await axios.get(`http://localhost:8000/fetchbooksdetail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const loanData = response.data.user[0];
      await setDLoan({   
        title: loanData.title,
        author: loanData.author,
        publication:loanData.publication,
        category_id: loanData.category,
        status: loanData.status
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching detail loan:', error);
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
    setToken(newToken);
    varnewToken = newToken;
    config.headers.Authorization = `Bearer ${newToken}`;
    const decoded = jwtDecode(newToken);
    setExpire(decoded.exp);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
  
  const Logout = async () => {
    try {
        await axios.delete('http://localhost:8001/logout');
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  }
  
              
const handleChange = (e) => {
    const { name, value } = e.target;
    setDLoan({ ...loan, [name]: value });
};
const handleTicketUpdate = async () => {
    try {
      const selectedCategory = category.find(category => category.name === loan.category_id);
      const selectedStatus = status.find(status => status.name === loan.status);

      const updateData = {
        title: loan.title,
        author: loan.author,
        publication:loan.publication,
        category_id: selectedCategory ? selectedCategory.id : null,
        status: selectedStatus ? selectedStatus.id : null,
      };
      axios.put(`http://localhost:8000/bookedit/${id}`, updateData);
      console.log('data :', updateData);
      Swal.fire({
        title: 'Ticket updated successfully',
        icon: 'success',
        customClass: {
          confirmButton: 'custom-success-alert',
        },
      });
      navigate('/books-master');
      } catch (error) {
        console.error('Error updating ticket:', error);
      }
    };

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
    <div className="logo4-1">
      <img src={logo} alt="logo4" />
    </div>
  );
  const Logo2 = () => (
    <div className="logo5-1">
      <img src={logo2} alt="logo5" />
    </div>
  );

    return (
      (isVerif === true) ?
      <>
      <main className={navVisible ? 'space-toggle2' : ''}> 
        <header className={`main-nav2 ${navVisible ? 'space-toggle2' : ''}`}>
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
                {navVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
          </div>
          <div className='header-content2 flex items-center'>
              <img className="imga" src={notif} alt="" />
              <img className="imga" src={profil} alt="" />
              <p className='text-white'>{name.name}</p>
          </div>
        </header>
        <nav className={!navVisible ? 'sidebar2' : ''}>
          <div className="sidebar__logo">
          {navVisible ? <Logo /> : <Logo2 />}
          </div>
          <div className="sidebar__menu">
            <div className="sidebar__menu__indicator"></div>
            {sidebarNavItems.map((item, index) => (
              <Link to={item.to} key={index} onClick={item.onClick}>
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
        <div id={imgVisible ? 'overlay3' : ''}></div>
          <div className="box-title3">
                <img src={back} onClick={() => navigate('/books-master')} className="box-btn2 cursor-pointer" alt="back" />
                <h2 className="content-box-title2">Edit Book</h2>
          </div>
          <div className='content-box3'>
            <div className='sub-box2'>
              <h4 className='sub-box-title'>Edit Book Details</h4>
              <hr className="border-black-900 line"></hr>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Book Title</p>
                    <div className="mt-auto">
                        <input
                            className={`border border-gray-300 sub-box-box1-col-input`}
                            name="title"
                            value={loan.title}
                            onChange={handleChange}
                        />
                   </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                  <p className="text-gray-700 font-semibold sub-box-box1-col-header">Author</p>
                  <div className="mt-auto">
                         <input
                            className={`border border-gray-300 sub-box-box1-col-input`}
                            name="author"
                            value={loan.author}
                            onChange={handleChange}
                        />
                  </div>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Publication Year</p>
                    <div className="mt-auto">
                        <input
                            className={`border border-gray-300 sub-box-box1-col-input`}
                            name="publication"
                            value={loan.publication}
                            onChange={handleChange}
                        />
                   </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                  <p className="text-gray-700 font-semibold sub-box-box1-col-header">Category</p>
                     <select
                      className={`border border-gray-300 sub-box-box1-col-input`}
                      name="category_id"
                      value={loan.category_id}
                      onChange={handleChange}
                      >
                      {category.length > 0 &&
                        category.map((status) => (
                          <option key={status.id} value={status.name}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Status</p>
                    <div className="mt-auto">
                    <select
                      className={`border border-gray-300 sub-box-box1-col-input`}
                      name="status"
                      value={loan.status}
                      onChange={handleChange}
                      >
                      {status.length > 0 &&
                        status.map((status) => (
                          <option key={status.id} value={status.name}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sub-box-box1"> 
                <div className="col-span-1 flex justify-end mt-2 mb-4 sub-box-box1-col">
                  <button onClick={() => navigate('/books-master')} className="bg-gray-200 hover:bg-gray-300 rounded-md button-cancel">
                    Cancel
                  </button>
                  <button className="text-white rounded-md  hover:bg-green-900  button-save" onClick= {handleTicketUpdate}>
                    Update
                  </button > 
                </div>
              </div>
            </div>        
          </div>
        </main>
      </>: ''
    );
  }
  
export default EditBooks