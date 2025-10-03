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
      .then((response) => setCurrentUser(response.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "Admin") {
        notFoundItemList()
          .then((response) => setLostItems(response.data))
          .catch((error) => console.error("Error fetching all lost items:", error))
          .finally(() => setLoading(false));
      } else if (currentUser.role === "Student") {
        lostItemListByUser()
          .then((response) => setLostItems(response.data))
          .catch((error) => console.error("Error fetching user's lost items:", error))
          .finally(() => setLoading(false));
      }
    }
  }, [currentUser]);

  const handleFoundSubmission = (itemId) => {
    // Navigate to redirected found item component
    navigate(`/Found-Redirected/${itemId}`);
  };

  const returnBack = () => {
    if (currentUser?.role === "Admin") {
      navigate("/AdminMenu");
    } else {
      navigate("/StudentMenu");
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading items...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <FaSearch size={40} className="text-indigo-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Lost Item Report</h1>
          <p className="text-gray-500 mt-2">
            Items that are currently reported as lost.
          </p>
        </div>

        {lostItems.length === 0 ? (
          <div className="text-center py-10">
            <FaRegSadTear size={50} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">No Lost Items Found</h2>
            <p className="text-gray-500 mt-2">
              There are currently no items reported as lost.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Item ID", "Item Name", "Category", "Brand", "Color",
                    "Location Lost", "Lost Date", "Reported By", "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lostItems.map((item) => (
                  <tr key={item.itemId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.color}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lostDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleFoundSubmission(item.itemId)}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
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
            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default LostItemReport;
