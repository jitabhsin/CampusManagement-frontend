// C:\Users\ASUS\Documents\Infosysproject2025\campus-frontVite-main\src\App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Login & Registration
import LoginPage from "./Components/LoginComponent/LoginPage";
import SignupPage from "./Components/LoginComponent/SignupPage"; // Corrected import name

// Menus
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenuMid from "./Components/LoginComponent/StudentMenuMid";
// Note: SingleStudentDetails is imported but not used in a Route.
import SingleStudentDetails from "./Components/LoginComponent/SingleStudentDetails";

// Item Components
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit";
import FoundItemSubmission from "./Components/ItemComponent/FoundItemSubmission";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Login / Registration */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<SignupPage />} />

          {/* Admin Menu */}
          <Route path="/AdminMenu" element={<AdminMenu />} />

          {/* Student Menus */}
          <Route path="/StudentMenu" element={<StudentMenuMid />} />
          {/* Example route if you decide to use it */}
          {/* <Route path="/student-details" element={<SingleStudentDetails />} /> */}

          {/* Item Submission */}
          <Route path="/lost-item" element={<LostItemSubmit />} />
          <Route path="/found-item" element={<FoundItemSubmission />} />

          {/* Reports */}
          <Route path="/lost-item-report" element={<LostItemReport />} />
          <Route path="/found-item-report" element={<FoundItemReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;