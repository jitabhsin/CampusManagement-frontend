import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import { foundItemList, foundItemListByUser } from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";

const FoundItemReport = () => {
  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "Admin") {
        foundItemList()
          .then((response) => setItemList(response.data))
          .catch((error) => console.error("Error fetching all found items:", error))
          .finally(() => setLoading(false));
      } else if (currentUser.role === "Student") {
        foundItemListByUser()
          .then((response) => setItemList(response.data))
          .catch((error) => console.error("Error fetching user's found items:", error))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [currentUser]);

  const returnBack = () => {
    if (currentUser?.role === "Admin") {
      navigate("/AdminMenu");
    } else {
      navigate("/StudentMenu");
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading found items...</div>;
  }

  const pageTitle = currentUser?.role === "Admin" ? "Found Item Report" : "My Found Items Report";
  const pageDescription = currentUser?.role === "Admin" ? "All Reported Found Items" : "Items you reported that have been found";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
            <FaBox size={35} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">{pageTitle}</h2>
          <p className="text-gray-500 mt-2">{pageDescription}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Item Id</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Item Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Color</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Found Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Entry Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {itemList.length > 0 ? (
                itemList.map((item) => (
                  <tr key={item.itemId} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{item.itemId}</td>
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.color}</td>
                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3">{item.location}</td>
                    <td className="px-4 py-3">{item.foundDate}</td>
                    <td className="px-4 py-3">{item.entryDate}</td>
                    <td className="px-4 py-3">{item.username}</td>
                    <td className="px-4 py-3">{item.userEmail}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-6 text-center text-gray-500">
                    No found items available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={returnBack}
            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundItemReport;