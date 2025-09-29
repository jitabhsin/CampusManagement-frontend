// C:\Users\ASUS\Documents\Infosysproject2025\campus-frontVite-main\src\Components\ItemComponent\FoundItemSubmission.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa6";
import {
  foundItemSubmission,
  itemIdGenerator,
} from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";

const FoundItemSubmit = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newId, setNewId] = useState("");
  const [campusUser, setCampusUser] = useState({});
  const [item, setItem] = useState({
    itemId: 0,
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
  });
  const [fdate, setFdate] = useState(new Date().toISOString().split("T")[0]);
  const [edate, setEdate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    itemIdGenerator()
      .then((res) => setNewId(res.data))
      .catch((err) => console.error("Failed to generate item ID:", err));

    getUserDetails()
      .then((res) => {
        setCampusUser(res.data);
        setItem((prev) => ({
          ...prev,
          username: res.data.username,
          userEmail: res.data.email,
        }));
      })
      .catch((err) => console.error("Failed to fetch user details:", err));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);
    foundItemSubmission({
      ...item,
      itemId: newId,
      username: campusUser.username,
      userEmail: campusUser.email,
      foundDate: fdate,
      entryDate: edate,
    })
      .then(() => {
        alert("Found Item submitted successfully! ID: " + newId);
        navigate("/StudentMenu");
      })
      .catch(() => alert("Failed to submit found item."))
      .finally(() => setIsSubmitting(false));
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    ["itemName", "category", "color", "brand", "location"].forEach((field) => {
      if (!item[field]?.trim()) {
        tempErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isValid = false;
      }
    });

    if (!fdate) {
      tempErrors.foundDate = "Found Date is required";
      isValid = false;
    }
    if (!edate) {
      tempErrors.entryDate = "Entry Date is required";
      isValid = false;
    }
    if (fdate && edate && new Date(fdate) > new Date(edate)) {
      tempErrors.foundDate = "Found Date cannot be after Entry Date";
      tempErrors.entryDate = "Entry Date cannot be before Found Date";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      submitForm();
    }
  };

  const returnBack = () => navigate("/StudentMenu");

  const inputStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyles = "text-red-500 text-xs mt-1";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
            <FaBoxOpen size={35} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Found Item Submission
          </h2>
          <p className="text-gray-500 mt-2">Campus Lost & Found Portal</p>
        </div>

        <form onSubmit={handleValidation} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyles}>Generated Item ID</label>
              <input
                className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                value={newId}
                readOnly
              />
            </div>
            <div>
              <label className={labelStyles}>User Name</label>
              <input
                className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                value={item.username}
                readOnly
              />
            </div>
            <div>
              <label className={labelStyles}>User Email</label>
              <input
                className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                value={item.userEmail}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="foundDate" className={labelStyles}>
                Select Found Date
              </label>
              <input
                id="foundDate"
                type="date"
                className={inputStyles}
                value={fdate}
                onChange={(e) => setFdate(e.target.value)}
              />
              {errors.foundDate && (
                <p className={errorStyles}>{errors.foundDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="entryDate" className={labelStyles}>
                Select Entry Date
              </label>
              <input
                id="entryDate"
                type="date"
                className={inputStyles}
                value={edate}
                onChange={(e) => setEdate(e.target.value)}
              />
              {errors.entryDate && (
                <p className={errorStyles}>{errors.entryDate}</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Item Description
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["itemName", "category", "color", "brand", "location"].map(
                (field) => (
                  <div key={field}>
                    <label htmlFor={field} className={labelStyles}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}*
                    </label>
                    <input
                      id={field}
                      name={field}
                      className={inputStyles}
                      value={item[field]}
                      onChange={onChangeHandler}
                    />
                    {errors[field] && (
                      <p className={errorStyles}>{errors[field]}</p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={returnBack}
              className="w-full bg-gray-500 text-white font-bold py-3 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundItemSubmit;