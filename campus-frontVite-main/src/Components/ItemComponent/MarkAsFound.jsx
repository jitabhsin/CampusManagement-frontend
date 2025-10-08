import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLostItemById, deleteLostItemById, foundItemSubmission } from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";

const MarkAsFound = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lostItem, setLostItem] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    Promise.all([getUserDetails(), getLostItemById(id)])
      .then(([userRes, itemRes]) => {
        setUser(userRes.data);
        setLostItem(itemRes.data);
      })
      .catch(() => alert("Failed to load item details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMarkAsFound = async () => {
    if (!lostItem || !user) return;

    const foundItem = {
      itemName: lostItem.itemName,
      category: lostItem.category,
      color: lostItem.color,
      brand: lostItem.brand,
      location: lostItem.location,
      imageUrl: lostItem.imageUrl,
      username: user.username,
      userEmail: user.email,
      foundDate: today,
    };

    try {
      await foundItemSubmission(foundItem);
      await deleteLostItemById(lostItem.lostItemId);
      alert("Item marked as found successfully!");
      navigate(user.role === "Admin" ? "/AdminMenu" : "/StudentMenu");
    } catch (error) {
      console.error(error);
      alert("Operation failed. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading item details...</div>;
  if (!lostItem) return <div className="text-center mt-10">Item not found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          Found Item Submission
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Review the details below before confirming.
        </p>
        <div className="space-y-3 text-gray-700">
          <p><strong>Item Name:</strong> {lostItem.itemName}</p>
          <p><strong>Category:</strong> {lostItem.category}</p>
          <p><strong>Brand:</strong> {lostItem.brand}</p>
          <p><strong>Color:</strong> {lostItem.color}</p>
          <p><strong>Location Lost:</strong> {lostItem.location}</p>
          <p><strong>Reported By:</strong> {lostItem.username}</p>
          <p><strong>Lost Date:</strong> {lostItem.lostDate}</p>
          <p><strong>Found Date:</strong> {today}</p>
          {lostItem.imageUrl && (
            <img
              src={lostItem.imageUrl}
              alt="Found Item"
              className="w-40 h-40 object-cover rounded-md mx-auto mt-4"
            />
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Return
          </button>
          <button
            onClick={handleMarkAsFound}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Confirm Mark as Found
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAsFound;
