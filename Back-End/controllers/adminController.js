const db = require('../config/dbConfig');
const Books = require('../models/booksModel');
const Category = require('../models/categoryModel');
const Loans = require('../models/loansModel');
const Users = require("../models/usersModel");
const format = require('pg-format');
const now = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Jakarta', // Set the time zone to Indonesian time (Asia/Jakarta)
};
const time_now = now.toLocaleString('en-ID', options);

const getBooksAdmin = async (req, res) => {  
    const { search } = req.query;
    try {
      let query = `SELECT
      b.id,
      b.title,
      b.author,
      b.publication,
      c.name as category,
      CASE
          WHEN b.status = 0 THEN 'Available'
          WHEN b.status = 1 THEN 'Booked'
          ELSE 'unknown'
      END as status
  FROM
      books b
  JOIN
      category c ON b.category_id = c.id
  WHERE 
      b.delete = 0`

    if (search) {
      query += ` AND b.title ILIKE '%${search}%'`;  
    }
    
    query += " ORDER BY b.id DESC;";  
  
      const [books] = await db.query(query);
      res.json({
        result: true,
        user: books,
        message: 'Successfully fetching books data',
      });
    } catch (err) {
      console.error('Error fetching books data:', err);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const [rowsAffected] = await Books.update({ delete: 1 }, { where: { id: bookId } });

    if (rowsAffected > 0) {
      return res.status(200).json({ success: true, message: 'Book deleted successfully' });
    }
    return res.status(404).json({ success: false, message: 'Book not found' });

  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getLoansAdmin = async (req, res) => {  
  const { search } = req.query;
  try {
    let query = `SELECT
    l.id,
    b.title,
    u.name AS "borrower",
    TO_CHAR(l.date_start, 'DD-MM-YYYY') as "date_created",
      CASE 
          WHEN l.date_return IS NOT NULL THEN 
            CASE 
              WHEN l.status = 1 THEN 
                CONCAT('Done')
              ELSE
                CASE
                    WHEN AGE(current_date, l.date_return) > INTERVAL '0' THEN 
                      CONCAT('Overdue ', EXTRACT(DAY FROM AGE(current_date, l.date_return)), ' day') 
                    WHEN AGE(current_date, l.date_return) = INTERVAL '0' THEN 
                      CONCAT('Today') 
                    ELSE 
                      CONCAT('Remaining ', ABS(EXTRACT(DAY FROM AGE(current_date, l.date_return))), ' day') 
                END 
            END 
          ELSE 'N/A'
        END AS status
      FROM
        loans l
      JOIN
        books b ON l.book_id = b.id
      JOIN
        users u ON l.user_id = u.id
    WHERE 
        l.delete = 0`
  if (search) {
    query += ` AND b.title ILIKE '%${search}%'`;  
  }
  
  query += " ORDER BY l.id DESC;";  

    const [loans] = await db.query(query);
    res.json({
      result: true,
      user: loans,
      message: 'Successfully fetching books data',
    });
  } catch (err) {
    console.error('Error fetching books data:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const getUsersAdmin = async (req, res) => {  
  const { search } = req.query;
  try {
    let query = `select id, name from users
    WHERE 
        delete = 0 and role_id=2`
  if (search) {
    query += ` AND name ILIKE '%${search}%'`;  
  }
  
  query += " ORDER BY id DESC;";  

    const [loans] = await db.query(query);
    res.json({
      result: true,
      user: loans,
      message: 'Successfully fetching books data',
    });
  } catch (err) {
    console.error('Error fetching books data:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const deleteLoan = async (req, res) => {
  const loanId = req.params.id;

  try {
    const [rowsAffected] = await Loans.update({ delete: 1 }, { where: { id: loanId } });

    if (rowsAffected > 0) {
      return res.status(200).json({ success: true, message: 'Loan deleted successfully' });
    }
    return res.status(404).json({ success: false, message: 'Loan not found' });

  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const loanId = req.params.id;

  try {
    const [rowsAffected] = await Users.update({ delete: 1 }, { where: { id: loanId } });

    if (rowsAffected > 0) {
      return res.status(200).json({ success: true, message: 'Loan deleted successfully' });
    }
    return res.status(404).json({ success: false, message: 'Loan not found' });

  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const fetchListBooks = async (req, res) => { 
  try {
    
    const books = await Books.findAll({
      attributes: ['id', 'title'],
      where: {
        status: 0
      }
    });
    res.json({
      result: true,
      user: books,
      message: 'Successfully fetching list books',
    });
  } catch (err) {
    console.error('Error fetching list books:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
const fetchListCategory = async (req, res) => { 
  try {
    
    const books = await Category.findAll({
      attributes: ['id', 'name']
    });
    res.json({
      result: true,
      user: books,
      message: 'Successfully fetching list books',
    });
  } catch (err) {
    console.error('Error fetching list books:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
const fetchListBooks2 = async (req, res) => { 
  try {
    
    const books = await Books.findAll({
      attributes: ['id', 'title']
    });
    res.json({
      result: true,
      user: books,
      message: 'Successfully fetching list books',
    });
  } catch (err) {
    console.error('Error fetching list books:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const fetchListUsers = async (req, res) => { 
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name'],
      where: {
        role_id: 2
      }
    });
    res.json({
      result: true,
      user: users,
      message: 'Successfully fetching list users',
    });
  } catch (err) {
    console.error('Error fetching list users:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const fetchLoanStatus = async (req, res) => { 
  try {
    let query = `select id, name from loans_status;`
    const [loans] = await db.query(query);
    res.json({
      result: true,
      user: loans,
      message: 'Successfully fetching loans status data',
    });
  } catch (err) {
    console.error('Error fetching list users:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const fetchBookStatus = async (req, res) => { 
  try {
    let query = `select id, name from books_status;`
    const [loans] = await db.query(query);
    res.json({
      result: true,
      user: loans,
      message: 'Successfully fetching loans status data',
    });
  } catch (err) {
    console.error('Error fetching list users:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const createNewLoanAdmin = async (req, res) => {
  const now2 = new Date(new Date().getTime() + 7 * 60 * 60 * 1000); 
  const lastUpdateDate2 = now2.toISOString().replace('T', ' ').slice(0, 19);
  const { book_id, user_id, date_start, date_return } = req.body;
     
  try {
    const sanitizedValues = [
      book_id,
      user_id,
      date_start,
      date_return,
      lastUpdateDate2,
      lastUpdateDate2
    ];
    
    const text = format(`
      INSERT INTO loans(
        book_id, user_id, status, date_start, date_return, date_created, date_changed, delete
      )
      VALUES (
        %s, %s, 0, %L, %L, %L, %L, 0
      )
      RETURNING *
    `, ...sanitizedValues);
      const { rows: newLoans } = await db.query(text);

      await Books.update({status : 1},{
        where:{
            id: book_id
        }
    });
    
      res.json({
        result: true,
        tickets: [newLoans],
        message: 'Successfully inserted a new ticket',
      });
  } catch (err) {
    console.error('Error creating a new ticket: ', err);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const createNewBookAdmin = async (req, res) => {
  const now2 = new Date(new Date().getTime() + 7 * 60 * 60 * 1000); 
  const lastUpdateDate2 = now2.toISOString().replace('T', ' ').slice(0, 19);
  const { title, author, publication, synopsis, category_id } = req.body;
     
  try {
    const sanitizedValues = [
      title,
      author,
      publication,
      synopsis,
      category_id,
      lastUpdateDate2,
      lastUpdateDate2
    ];
    
    const text = format(`
      INSERT INTO books(
        title, author, publication, synopsis, status, category_id, date_created, date_changed, delete
      )
      VALUES (
        %L, %L, %L, %L, 0, %s, %L, %L, 0
      )
      RETURNING *
    `, ...sanitizedValues);
      const { rows: newLoans } = await db.query(text);
   
      res.json({
        result: true,
        tickets: [newLoans],
        message: 'Successfully inserted a new books',
      });
  } catch (err) {
    console.error('Error creating a new ticket: ', err);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const createNewUserAdmin = async (req, res) => {
  const now2 = new Date(new Date().getTime() + 7 * 60 * 60 * 1000); 
  const lastUpdateDate2 = now2.toISOString().replace('T', ' ').slice(0, 19);
  const { name } = req.body;
     
  try {
    const sanitizedValues = [
      name,
      lastUpdateDate2,
      lastUpdateDate2
    ];
    
    const text = format(`
      INSERT INTO users(
        name, date_created, date_changed, delete
      )
      VALUES (
        %L, %L, %L, 0
      )
      RETURNING *
    `, ...sanitizedValues);
      const { rows: newLoans } = await db.query(text);
   
      res.json({
        result: true,
        tickets: [newLoans],
        message: 'Successfully inserted a new books',
      });
  } catch (err) {
    console.error('Error creating a new ticket: ', err);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const getLoanDetails = async (req, res) => {
  try {
      const { id } = req.params ;
      const [ticket] = await db.query(
          `SELECT    
          b.title,
          u.name AS "borrower",
          CASE 
              WHEN l.status = 1 THEN 'Done'
              ELSE 'On Going'
          END AS "status",
          TO_CHAR(l.date_start, 'DD-MM-YYYY') AS "date_start",
          TO_CHAR(l.date_return, 'DD-MM-YYYY') AS "date_return"
      FROM
          loans l
      JOIN
          books b ON l.book_id = b.id
      JOIN
          users u ON l.user_id = u.id
          WHERE l.id = ${id}`);
      res.json({
          result: true,
          user: ticket,
          message: 'Successfully fetching data loan detail',
      });
  } catch (err) {
      console.error('Error fetching data loan detail:', err);
      res.status(500).json({
          error: 'Internal server error',
      });
  }
};

const getLBooksDetails = async (req, res) => {
  try {
      const { id } = req.params ;
      const [ticket] = await db.query(
          `SELECT    
          b.title,
          b.author,
          b.publication,
          c.name as category,
          CASE
              WHEN b.status = 0 THEN 'Available'
              WHEN b.status = 1 THEN 'Booked'
              ELSE 'unknown'
          END as status
      FROM
          books b
      JOIN
          category c ON b.category_id = c.id
          WHERE b.id = ${id}`);
      res.json({
          result: true,
          user: ticket,
          message: 'Successfully fetching data book detail',
      });
  } catch (err) {
      console.error('Error fetching data book detail:', err);
      res.status(500).json({
          error: 'Internal server error',
      });
  }
};

const getLUsersDetails = async (req, res) => {
  try {
      const { id } = req.params ;
      const [ticket] = await db.query(
          `SELECT    
          name from users
          WHERE id = ${id}`);
      res.json({
          result: true,
          user: ticket,
          message: 'Successfully fetching data book detail',
      });
  } catch (err) {
      console.error('Error fetching data book detail:', err);
      res.status(500).json({
          error: 'Internal server error',
      });
  }
};

const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { borrower, status, date_start, date_return} = req.body;

  try {
     await Loans.update({date_changed : time_now},{
      where:{
          id: id
      }
     });
      const loans = await Loans.findOne({
          attributes: ['id','user_id','status', 'date_start', 'date_return'],
          where: { id }
      });
      if (!loans) {
          return res.json({
              result: false,
              update: null,
              message: 'Ticket not found',
          });
      }
      // Update ticket fields
      loans.status = status;
      loans.user_id = borrower;
      loans.date_start = date_start;
      loans.date_return = date_return;

      await loans.save();
      return res.json({
          result: true,
          update: loans,
          message: 'Loan updated successfully',
      });

  } catch (error) {
      console.error('Error updating loan:', error);
      return res.status(500).json({
          error: 'Internal server error',
          details: error.message,
      });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publication, category_id, status } = req.body;

  try {
    await Books.update({ date_changed: time_now }, {
      where: {
        id: id
      }
    });

    const book = await Books.findByPk(id);

    if (!book) {
      return res.json({
        result: false,
        update: null,
        message: 'Book not found',
      });
    }

    // Update book fields
    book.title = title;
    book.author = author;
    book.publication = publication;
    book.category_id = category_id;
    book.status = status;

    await book.save();

    return res.json({
      result: true,
      update: book,
      message: 'Book updated successfully',
    });
  } catch (error) {
    console.error('Error updating book:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.json({
        result: false,
        update: null,
        message: 'User not found',
      });
    }

    // Update user fields
    user.name = name;

    await user.save();

    return res.json({
      result: true,
      update: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};


module.exports = {
    getBooksAdmin,
    getLoansAdmin,
    fetchListBooks,
    fetchListBooks2,
    fetchListUsers,
    fetchLoanStatus,
    deleteBook,
    deleteLoan,
    createNewLoanAdmin,
    getLoanDetails,
    updateLoan ,
    fetchListCategory,
    createNewBookAdmin,
    getLBooksDetails,
    fetchBookStatus,
    updateBook,
    getUsersAdmin,
    deleteUser, 
    createNewUserAdmin,
    getLUsersDetails,
    updateUser
};
