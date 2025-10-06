import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import SigninPage from "./Components/LoginComponent/SignupPage";
import SingleStudentDetails from "./Components/LoginComponent/SingleStudentDetails";
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemSubmission from "./Components/ItemComponent/FoundItemSubmission";
import FoundItemRedirected from "./Components/ItemComponent/FoundItemRedirected";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";
import Personal from "./Components/LoginComponent/Personal";
import StudentList from "./Components/LoginComponent/StudentList";
import DeleteStudentList from "./Components/LoginComponent/DeleteStudentList"; // <-- import added
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Authentication & Registration */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<SigninPage />} />

          {/* Admin & Student Menus */}
          <Route path="/AdminMenu" element={<AdminMenu />} />
          <Route path="/StudentMenu" element={<StudentMenu />} />

          {/* Student Details */}
          <Route path="/SingleStudentDetail" element={<SingleStudentDetails />} />
          <Route path="/Students" element={<StudentList />} />
          <Route path="/DeleteStudentList" element={<DeleteStudentList />} /> {/* <-- route added */}

          {/* Lost Item Routes */}
          <Route path="/LostSubmit" element={<LostItemSubmit />} />
          <Route path="/LostReport" element={<LostItemReport />} />

          {/* Found Item Routes */}
          <Route path="/Found-Submit" element={<FoundItemSubmission />} />
          <Route path="/Found-Submit/:id" element={<FoundItemRedirected />} />
          <Route path="/FoundReport" element={<FoundItemReport />} />

          {/* Personal */}
          <Route path="/Personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
