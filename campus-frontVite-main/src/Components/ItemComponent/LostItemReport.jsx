import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notFoundItemList, lostItemListByUser } from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";
import { FaSearch, FaRegSadTear, FaTimes } from "react-icons/fa";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // for modal
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails()
      .then((res) => setCurrentUser(res.data))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchItems =
        currentUser.role === "Admin" ? notFoundItemList : lostItemListByUser;
      fetchItems()
        .then((res) => setLostItems(res.data))
        .catch(() => console.error("Failed to load items"))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  const handleFoundSubmission = (itemId) => {
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
          <p className="text-gray-500 mt-2">
            Items that are currently reported as lost.
          </p>
        </div>

        {lostItems.length === 0 ? (
          <div className="text-center py-10">
            <FaRegSadTear size={50} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Lost Items Found
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Item ID",
                    "Item Name",
                    "Category",
                    "Brand",
                    "Color",
                    "Location Lost",
                    "Lost Date",
                    "Reported By",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase"
                    >
                      {header}
                    </th>
                  ))}

                  {currentUser?.role === "Student" && (
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {lostItems.map((item) => (
                  <tr
                    key={item.itemId}
                    className="hover:bg-indigo-50 cursor-pointer transition"
                    onClick={() => setSelectedItem(item)} // open modal
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.itemId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.itemName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.brand}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.color}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.lostDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.username}
                    </td>

                    {currentUser?.role === "Student" && (
                      <td
                        className="px-6 py-4 text-sm font-medium"
                        onClick={(e) => e.stopPropagation()} // prevent row click from triggering
                      >
                        <button
                          onClick={() => handleFoundSubmission(item.itemId)}
                          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
                        >
                          Mark as Found
                        </button>
                      </td>
                    )}
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

{/* Popup Modal */}
{selectedItem && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full relative overflow-y-auto">
      <button
        onClick={() => setSelectedItem(null)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      >
        <FaTimes size={20} />
      </button>

      <div className="flex flex-col items-center space-y-4 p-6">
        {/* Image section only if it exists */}
        {selectedItem.imageUrl && (
          <img
            src={selectedItem.imageUrl}
            alt={selectedItem.itemName}
            className="w-40 h-40 object-cover rounded-md shadow-md"
          />
        )}

        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {selectedItem.itemName}
        </h2>

        <div className="w-full text-left space-y-2 text-gray-700">
          <p><span className="font-semibold">Item ID:</span> {selectedItem.itemId}</p>
          <p><span className="font-semibold">Category:</span> {selectedItem.category}</p>
          <p><span className="font-semibold">Brand:</span> {selectedItem.brand}</p>
          <p><span className="font-semibold">Color:</span> {selectedItem.color}</p>
          <p><span className="font-semibold">Location Lost:</span> {selectedItem.location}</p>
          <p><span className="font-semibold">Lost Date:</span> {selectedItem.lostDate}</p>
          <p><span className="font-semibold">Reported By:</span> {selectedItem.username}</p>
        </div>
      </div>
    </div>
  </div>


      )}
    </div>
  );
};

export default LostItemReport;
