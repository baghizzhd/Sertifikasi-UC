const express = require("express");
const { Login, Logout, fetchUserNickname } = require("../controllers/userController.js");
const verifyToken = require( "../middlewares/VerifyToken.js");
const refreshToken = require("../controllers/RefreshToken.js");
const { updateUser, getLUsersDetails, createNewUserAdmin, getBooksAdmin, deleteBook, getLoansAdmin, deleteLoan, fetchListBooks, fetchListBooks2, fetchListUsers, createNewLoanAdmin, getLoanDetails,  updateLoan, fetchListCategory, createNewBookAdmin, fetchLoanStatus, getLBooksDetails,  fetchBookStatus, updateBook, getUsersAdmin, deleteUser } = require("../controllers/adminController.js");
const multer = require('multer');
const upload = multer(); 

const router = express.Router();

router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/fetchlistbooks',  fetchListBooks ) 
router.get('/fetchlistcategories',  fetchListCategory )

router.get('/fetchloanstatus',  fetchLoanStatus ) 
router.get('/fetchbookstatus',  fetchBookStatus ) 
router.get('/fetchlistbooks2',  fetchListBooks2 ) 
router.get('/fetchlistusers',  fetchListUsers ) 
router.get('/uservalidation', verifyToken, fetchUserNickname) 
router.get('/fetchbooks', verifyToken, getBooksAdmin) 
router.get('/fetchloans',verifyToken, getLoansAdmin) 
router.get('/fetchusers',verifyToken, getUsersAdmin) 
router.get('/fetchloansdetail/:id', getLoanDetails) 
router.get('/fetchbooksdetail/:id', getLBooksDetails) 
router.get('/fetchusersdetail/:id', getLUsersDetails) 



router.delete('/deletebook/:id', verifyToken, deleteBook);
router.delete('/deleteloan/:id', verifyToken, deleteLoan);
router.delete('/deleteuser/:id', verifyToken, deleteUser);

router.post('/insertloan', upload.none(), verifyToken, createNewLoanAdmin);
router.post('/insertbook', upload.none(), verifyToken, createNewBookAdmin);
router.post('/insertuser', upload.none(), verifyToken, createNewUserAdmin);

router.put('/loanedit/:id', updateLoan );
router.put('/bookedit/:id', updateBook );
router.put('/useredit/:id', updateUser );
module.exports = router;