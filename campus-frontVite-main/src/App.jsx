import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenuGoodUI from "./Components/LoginComponent/StudentMenuGoodUI";
import SigninPage from "./Components/LoginComponent/SignupPage";
import SingleStudentDetails from "./Components/LoginComponent/SingleStudentDetails";
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemSubmission from "./Components/ItemComponent/FoundItemSubmission"; // fresh submission
import FoundItemRedirected from "./Components/ItemComponent/FoundItemRedirected"; // redirected
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<SigninPage />} />
          <Route path="/AdminMenu" element={<AdminMenu />} />
          <Route path="/StudentMenu" element={<StudentMenuGoodUI />} />
          <Route path="/SingleStudentDetail" element={<SingleStudentDetails />} />
          <Route path="/LostSubmit" element={<LostItemSubmit />} />
          <Route path="/LostReport" element={<LostItemReport />} />
          <Route path="/FoundSubmit" element={<FoundItemSubmission />} /> {/* fresh */}
          <Route path="/Found-Redirected/:id" element={<FoundItemRedirected />} /> {/* redirected */}
          <Route path="/FoundReport" element={<FoundItemReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
