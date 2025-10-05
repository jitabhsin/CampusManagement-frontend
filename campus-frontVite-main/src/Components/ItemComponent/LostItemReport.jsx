import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notFoundItemList, lostItemListByUser } from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";
import { FaSearch, FaRegSadTear } from "react-icons/fa";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails()
      .then((res) => setCurrentUser(res.data))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchItems = currentUser.role === "Admin" ? notFoundItemList : lostItemListByUser;
      fetchItems()
        .then((res) => setLostItems(res.data))
        .catch(() => console.error("Failed to load items"))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  const handleFoundSubmission = (itemId) => {
    // CHANGE: The route is "/Found-Submit/:id", not "/Found-Submit-Redirected/:id"
    navigate(`/Found-Submit/${itemId}`);
  };

  const returnBack = () => {
    navigate(currentUser?.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  if (loading) return <div className="text-center mt-10">Loading items...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <FaSearch size={40} className="text-indigo-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Lost Item Report</h1>
          <p className="text-gray-500 mt-2">Items that are currently reported as lost.</p>
        </div>

        {lostItems.length === 0 ? (
          <div className="text-center py-10">
            <FaRegSadTear size={50} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">No Lost Items Found</h2>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {["Item ID","Item Name","Category","Brand","Color","Location Lost","Lost Date","Reported By","Action"].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lostItems.map(item => (
                  <tr key={item.itemId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.itemName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.brand}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.color}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.lostDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.username}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleFoundSubmission(item.itemId)}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
                      >
                        Mark as Found
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={returnBack}
            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default LostItemReport;