import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import { foundItemSubmission, itemIdGenerator } from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";

const FoundItemSubmission = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newId, setNewId] = useState("");
  const [campusUser, setCampusUser] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const [foundDate, setFoundDate] = useState(today);
  const [entryDate, setEntryDate] = useState(today);

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

  useEffect(() => {
    itemIdGenerator().then((response) => setNewId(response.data));
    getUserDetails().then((response) => {
      const userData = response.data;
      setCampusUser(userData);
      setItem((prev) => ({
        ...prev,
        username: userData.username,
        userEmail: userData.email,
      }));
    });
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setItem((values) => ({ ...values, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    let tempErrors = {};
    let isValid = true;

    if (!foundDate) {
      tempErrors.foundDate = "Found Date is required";
      isValid = false;
    }
    if (!entryDate) {
      tempErrors.entryDate = "Entry Date is required";
      isValid = false;
    }
    if (!String(item.itemName || "").trim()) {
      tempErrors.itemName = "Item Name is required";
      isValid = false;
    }
    if (!String(item.location || "").trim()) {
      tempErrors.location = "Location is required";
      isValid = false;
    }
    if (!String(item.category || "").trim()) {
      tempErrors.category = "Item Category is required";
      isValid = false;
    }
    if (!String(item.brand || "").trim()) {
      tempErrors.brand = "Item Brand is required";
      isValid = false;
    }
    if (!String(item.color || "").trim()) {
      tempErrors.color = "Item Color is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    const finalItem = {
      ...item,
      itemId: newId,
      username: campusUser.username,
      userEmail: campusUser.email,
      foundDate,
      entryDate,
      lostDate: null,
    };

    foundItemSubmission(finalItem)
      .then(() => {
        alert("Found Item Submitted Successfully!");
        if (campusUser?.role === "Admin") {
          navigate("/AdminMenu");
        } else {
          navigate("/StudentMenu");
        }
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Submission failed. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const returnBack = () => {
    if (campusUser?.role === "Admin") navigate("/AdminMenu");
    else navigate("/StudentMenu");
  };

  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyles = "text-red-500 text-xs mt-1";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
            <FaBox size={35} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Found Item Submission</h2>
          <p className="text-gray-500 mt-2">Report an item you have found.</p>
        </div>

        <form onSubmit={handleValidation}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-6">
              <div>
                <label className={labelStyles}>Generated Item ID</label>
                <input className={`${inputStyles} bg-gray-100 cursor-not-allowed`} value={newId} readOnly />
              </div>
              <div>
                <label className={labelStyles}>User Name</label>
                <input className={`${inputStyles} bg-gray-100 cursor-not-allowed`} value={item.username} readOnly />
              </div>
              <div>
                <label className={labelStyles}>User Email</label>
                <input className={`${inputStyles} bg-gray-100 cursor-not-allowed`} value={item.userEmail} readOnly />
              </div>
              <div>
                <label htmlFor="foundDate" className={labelStyles}>Select Found Date *</label>
                <input id="foundDate" type="date" className={inputStyles} value={foundDate} onChange={(e) => setFoundDate(e.target.value)} />
                {errors.foundDate && <p className={errorStyles}>{errors.foundDate}</p>}
              </div>
              <div>
                <label htmlFor="entryDate" className={labelStyles}>Select Entry Date *</label>
                <input id="entryDate" type="date" className={inputStyles} value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
                {errors.entryDate && <p className={errorStyles}>{errors.entryDate}</p>}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="itemName" className={labelStyles}>Item Name *</label>
                <input id="itemName" name="itemName" className={inputStyles} value={item.itemName} onChange={onChangeHandler} />
                {errors.itemName && <p className={errorStyles}>{errors.itemName}</p>}
              </div>
              <div>
                <label htmlFor="category" className={labelStyles}>Category *</label>
                <input id="category" name="category" className={inputStyles} value={item.category} onChange={onChangeHandler} />
                {errors.category && <p className={errorStyles}>{errors.category}</p>}
              </div>
              <div>
                <label htmlFor="color" className={labelStyles}>Color *</label>
                <input id="color" name="color" className={inputStyles} value={item.color} onChange={onChangeHandler} />
                {errors.color && <p className={errorStyles}>{errors.color}</p>}
              </div>
              <div>
                <label htmlFor="brand" className={labelStyles}>Brand *</label>
                <input id="brand" name="brand" className={inputStyles} value={item.brand} onChange={onChangeHandler} />
                {errors.brand && <p className={errorStyles}>{errors.brand}</p>}
              </div>
              <div>
                <label htmlFor="location" className={labelStyles}>Location Where it was Found *</label>
                <input id="location" name="location" className={inputStyles} value={item.location} onChange={onChangeHandler} />
                {errors.location && <p className={errorStyles}>{errors.location}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button type="button" onClick={returnBack} className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-600 transition">
              Return
            </button>
            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition">
              {isSubmitting ? "Submitting..." : "Submit Found Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundItemSubmission;
