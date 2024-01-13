
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./Components/Login";
import Books from "./Components/admin/MasterBooks";
import Loans from "./Components/admin/MasterLoans";
import Users from "./Components/admin/MasterUsers";
import EditLoans from "./Components/admin/EditLoans";
import EditBooks from "./Components/admin/EditBooks";
import NewLoans from "./Components/admin/NewLoans";
import NewBooks from "./Components/admin/NewBooks";
import NewUsers from "./Components/admin/NewUsers";
import EditUser from "./Components/admin/EditUsers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect all unknown routes to the home route */}
        {/* <Route path="*" element={<BlankPage />} /> */}
        {/* Other routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books-master" element={<Books />} />
        <Route path="/loans-master" element={<Loans />} />
        <Route path="/users-master" element={<Users />} />
        <Route path="/loans-edit/:id" element={<EditLoans />} />
        <Route path="/books-edit/:id" element={<EditBooks />} />
        <Route path="/users-edit/:id" element={<EditUser  />} />    
        <Route path="/loans-new" element={<NewLoans />} />
        <Route path="/books-new" element={<NewBooks />} />
        <Route path="/users-new" element={<NewUsers />} />
        <Route path="/users-master" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
