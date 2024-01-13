import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
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
import Select from 'react-select';



const NewBooks = () => {
  const [isVerif, setIsVerif] = useState(null);
  const [books, setBooks] = useState({  id:'',name: '' }); 
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const fetchData = async () => {
    try {
      await refreshToken(); 
      getBooks();
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
  const [token, setToken] = useState(null);
  const [expire, setExpire] = useState(null);
  const [newLoans, setNewLoans]  = useState({title:'', author:'', publication: '', synopsis:'', category_id:'', file_url:''});
  const [selectedBooks, setSelectedBooks] = useState(null);
  
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

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/fetchlistcategories');
      const userData = response.data.user;
  
      if (userData && Array.isArray(userData)) {
        const booksData = userData.map(books => ({
          id: books.id,
          name: books.name
        }));
        setBooks({
          bookss: booksData
        }); 
      } else {
        console.error("Invalid or missing user data in the response:", response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching list books data:", error);
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
      setToken(token);
    }
    setLoading(false);
  } catch (error) {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newLoans);
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('title', newLoans.title);
      formData.append('author', newLoans.author);
      formData.append('publication', newLoans.publication);
      formData.append('synopsis', newLoans.synopsis);
      formData.append('category_id', newLoans.category_id);
      formData.append('file_url', newLoans.file_url);
      // Send a POST request with formData to add a new ticket
      await axiosJWT.post('http://localhost:8000/insertbook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${varnewToken}`
        },
      });
      console.log('data : ',formData)
      // Show a browser alert
      Swal.fire({
        title: 'New Book Created Successfully!',
        icon: 'success',
        customClass: {
          confirmButton: 'custom-success-alert', 
        },
      });  
      // Navigate and create a success alert
      navigate('/books-master');
    } catch (error) {
      console.error('Error adding ticket:', error);
      // Show an error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error Creating New Ticket',
      });
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
  
  const handleInputChange = (e) => {
    if (e && e.target) {
        const { name, value } = e.target;
        setNewLoans({
            ...newLoans,
            [name]: value,
        });
    }
};

const handleInputChange2 = (selectedOption) => {
  const value = selectedOption ? selectedOption.value : "";
  setSelectedBooks(selectedOption); 
  setNewLoans({
    ...newLoans,
    category_id: value,
  });
};

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      minHeight: '10px',
      height: '36px',
      fontSize: '14px',
      color: '#000000',
      borderRadius: '0.375rem',
      '@media (min-width: 768px) and (max-width: 1023.98px)': {
        fontSize: '12px',
        minHeight: '10px',
        height: '28px',
      },
      '@media (min-width: 576px) and (max-width: 767.98px)': {
        fontSize: '11px',
        minHeight: '10px',
        height: '26.5px',
        marginTop:'9px',
      },
      '@media (max-width: 575.98px)': {
        fontSize: '11px',
        minHeight: '10px',
        height: '26.5px',
        marginTop:'9px',
      }
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: '#000000', // Set the placeholder color to black
      };
    },
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2097152; // 2 MB in bytes (2 * 1024 * 1024)
    if (file && file.size > maxSize) {
      // File size exceeds the limit
      Swal.fire({
        icon: 'error',
        title: 'File Size Exceeds Limit',
        text: 'Please choose a smaller file (maximum 2 MB).',
      });
      e.target.value = null; // Reset the input field
    } else {
      setSelectedFile(file);
      // File size is within the limit, update newTicket state with the selected file
      setNewLoans({
        ...newLoans,
        file_url: file,
      });
      
    }
  };

  const openImageInNewTab = () => {
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      window.open(imageUrl, '_blank');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setNewLoans({
      ...newLoans,
      file_url: '',
    });
    // Reset the value of the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
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
                <h2 className="content-box-title2">New Books</h2>
          </div>
          <form onSubmit={handleSubmit} className='content-box3'>
            <div className='sub-box2'>
              <h4 className='sub-box-title'>Enter Books Details</h4>
              <hr className="border-black-900 line"></hr>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Title</p>
                    <div className="mt-auto">
                    <input required
                        type="text"
                        className="border border-gray-300 sub-box-box1-col-input"
                        name="title" 
                        defaultValue={newLoans.title}
                        placeholder={"Enter Title"}
                        onChange={handleInputChange}                 
                      />
                    </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Author</p>
                    <div className="mt-auto">
                    <input
                        type="text"
                        className="border border-gray-300 sub-box-box1-col-input"
                        name="author" 
                        defaultValue={newLoans.author}
                        placeholder={"Enter Author"}
                        onChange={handleInputChange}                 
                      />
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Publication</p>
                    <div className="mt-auto">
                    <input
                        type="text"
                        className="border border-gray-300 sub-box-box1-col-input"
                        name="publication" 
                        defaultValue={newLoans.publication}
                        placeholder={"Enter Publication"}
                        onChange={handleInputChange}                 
                      />
                    </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Synopsis</p>
                    <div className="mt-auto">
                    <input
                        type="text"
                        className="border border-gray-300 sub-box-box1-col-input"
                        name="synopsis" 
                        defaultValue={newLoans.synopsis}
                        placeholder={"Enter Synopsis"}
                        onChange={handleInputChange}                 
                      />
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sub-box-box1"> 
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Category</p>
                    <div className="mt-auto">
                        <Select required
                          styles={customStyles}
                          name="category_id"
                          onChange={handleInputChange2}
                          value={selectedBooks}
                          options={books.bookss && books.bookss.length > 0
                            ? books.bookss.map(books => ({ value: books.id, label: books.name }))
                            : []
                          }
                          placeholder="Select Category"
                        />
                   </div>
                </div>
                <div className="col-span-1 sub-box-box1-col">
                    <p className="text-gray-700 font-semibold sub-box-box1-col-header">Attach Photo (png, jpeg, jpg*)</p>
                    <div className="mt-auto">
                    <input
                        type="file"
                        name='file_url'
                        className="border border-gray-300 sub-box-box1-col-input-file"
                        placeholder="Upload file"
                        accept=".png, .jpeg, .jpg"
                        size="2097152"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </div>
                    {selectedFile && (
                    <div className="mt-2">
                    <p>Preview:</p>
                      <img
                        onClick={openImageInNewTab}
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="max-w-full max-h-32 cursor-pointer img-preview"
                      />
                      <button
                        onClick={removeFile}
                        className="bg-red-500 hover:bg-red-800 text-white p-1 rounded-full px-4 text-sm mt-2"
                      >
                        Remove
                    </button>
                  </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sub-box-box1"> 
                <div className="col-span-1 flex justify-end mt-2 mb-4 sub-box-box1-col">
                  <button onClick={() => navigate('/books-master')} className="bg-gray-200 hover:bg-gray-300 rounded-md button-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="text-white rounded-md  hover:bg-green-900  button-save">
                    Save
                  </button > 
                </div>
              </div>
            </div>        
          </form>
        </main>
      </>: ''
    );
  }
  
export default NewBooks