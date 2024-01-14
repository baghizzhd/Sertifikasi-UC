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
import { jwtDecode } from 'jwt-decode';

const EditLoans = () => {
  const { id } = useParams();
  const [isVerif, setIsVerif] = useState(null);  
  const [imageSrc, setImageSrc] = useState(null);
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

  const [activeIndex] = useState(1);
  const navigate = useNavigate();
  const [navVisible, showNavbar] = useState(false);
  const [imgVisible, showImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({name: ''});  
  const [user, setUser] = useState({ id:'', name: '' });  
  const [status, setStatus] = useState({ id:'', name: '' }); 
  const [token, setToken] = useState(null);
  const [expire, setExpire] = useState(null);
  const [loan, setDLoan]  = useState({
    id:'',
    title: '',
    borrower: '',
    status:'',
    date_start: '',
    date_return: '',
    file_url :''
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
  
  const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/fetchlistusers');
        const userData = response.data.user;
        const usersNames = userData.map(user => ({
            id: user.id,
            name: user.name
        }));
        setUser(usersNames); 
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
};
const getStatus = async () => {
    try {
        const response = await axios.get('http://localhost:8000/fetchloanstatus');
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
      getUsers();
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
      const response = await axios.get(`http://localhost:8000/fetchloansdetail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const loanData = response.data.user[0];
      await setDLoan({    
      id:loanData.id,  
      title: loanData.title,
      borrower: loanData.borrower,
      status:loanData.status,
      date_start: loanData.date_start,
      date_return:loanData.date_return,
      file_url :loanData.file_url
      });
      console.log('Data Loan: ',loanData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching detail loan:', error);
      setLoading(false);
    }
  };
  
  const Logout = async () => {
    try {
        await axios.delete('http://localhost:8001/logout');
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  }
            

const handleTicketUpdate = async () => {
    try {
      const selectedUsers = user.find(users => users.name === loan.borrower);
      const selectedStatus = status.find(status => status.name === loan.status);
      const updateData = {
        borrower: selectedUsers ? selectedUsers.id : null,
        status: selectedStatus ? selectedStatus.id : null,
        date_start: formatDateForInput(loan.date_start),
        date_return: formatDateForInput(loan.date_return),
      };
      await axios.put(`http://localhost:8000/loanedit/${id}`, updateData);
      console.log(updateData);
      Swal.fire({
        title: 'Loan updated successfully',
        icon: 'success',
        customClass: {
          confirmButton: 'custom-success-alert',
        },
      });
      navigate('/loans-master');
      } catch (error) {
        console.error('Error updating ticket:', error);
      }
    };

    function formatDateForInput(originalDate) {
      const [day, month, year] = originalDate.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      const formattedValue = e.target.type === 'date' ? formatDateForInput(value) : value;
      setDLoan({ ...loan, [name]: formattedValue });
      console.log('On Change : ',loan);
  };

  useEffect(() => {
    if (loan.file_url) {
      showImage();
    }
  }, [loan.file_url]);

  const showImage = async () => {
    try {
      console.log('url: ',loan.file_url);
      const file_url = encodeURIComponent(loan.file_url);
      const response = await axios.get(`http://localhost:8000/show/${file_url}`);
      setImageSrc(response.data.dataUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const openImageInNewTab = () => {
    // Assuming response.data contains the dataUrl
    const dataUrl = imageSrc;
  
    // Open a new tab with the image
    const newTab = window.open('', '_blank');
  
    // Check if newTab is not null before accessing its document property
    if (newTab) {
      // Open the document for writing
      newTab.document.open();
  
      // Write the image data to the new tab
      newTab.document.write(`
        <html>
          <head>
            <title>Image Preview</title>
          </head>
          <body>
            <img src="${dataUrl}" alt="Image Preview">
          </body>
        </html>
      `);
  
      // Close the document to ensure proper rendering
      newTab.document.close();
    } else {
      console.error('Failed to open a new tab.');
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
                <img src={back} onClick={() => navigate('/loans-master')} className="box-btn2 cursor-pointer" alt="back" />
                <h2 className="content-box-title2">Edit Loan</h2>
          </div>
          <div className='content-box3'>
            <div className='sub-box2'>
              <h4 className='sub-box-title'>Edit Loan Details</h4>
              <hr className="border-black-900 line"></hr>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                        <p className="text-gray-700 font-semibold sub-box-box1-col-header">ID Loan</p>
                        <div className="mt-auto">
                            <input readOnly
                                className={`border border-gray-300 sub-box-box1-col-input bg-gray-100`}
                                name="title"
                                value={loan.id}>
                            </input>
                      </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Book Title</p>
                    <div className="mt-auto">
                        <input readOnly
                            className={`border border-gray-300 sub-box-box1-col-input bg-gray-100`}
                            name="title"
                            value={loan.title}>
                        </input>
                   </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                  <p className="text-gray-700 font-semibold sub-box-box1-col-header">Select User</p>
                  <div className="mt-auto">
                  <select
                      className={`border border-gray-300 sub-box-box1-col-input`}
                      name="borrower"
                      value={loan.borrower}
                      onChange={handleChange}
                      >
                      {user.length > 0 &&
                        user.map((user) => (
                          <option key={user.id} value={user.name}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                  </div>
                 </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Loan Date</p>
                    <div className="mt-auto">
                    <input
                        type="date"
                        className="border border-gray-300 sub-box-box1-col-input"
                        value={formatDateForInput(loan.date_start)}
                        onChange={handleChange}
                        name="date_start" 
                      />
                    </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Date Return</p>
                    <div className="mt-auto">
                    <input
                        type="date"
                        className="border border-gray-300 sub-box-box1-col-input"
                        value={formatDateForInput(loan.date_return)}
                        onChange={handleChange}
                        name="date_return" 
                      />
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                  <p className="text-gray-700 font-semibold sub-box-box1-col-header">Book Preview</p>
                  <div className="mt-auto">
                    {loan.file_url && (
                      <img
                        onClick={openImageInNewTab}
                        src={imageSrc}
                        alt="Preview"
                        className="max-w-full max-h-32 cursor-pointer img-preview"
                      />
                    )}
                  </div>
                 </div>
              </div>
              <div className="grid grid-cols-1 sub-box-box1"> 
                <div className="col-span-1 flex justify-end mt-2 mb-4 sub-box-box1-col">
                  <button onClick={() => navigate('/loans-master')} className="bg-gray-200 hover:bg-gray-300 rounded-md button-cancel">
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
  
export default EditLoans