import React, { useEffect, useState } from "react";
import { lostItemListByUser, getMatchingFoundItems } from "../../Services/ItemService";
import { FaSearch, FaTimes } from "react-icons/fa";

// ----------------------------
// Found Item Tile Component
// ----------------------------
const FoundItemTile = ({ item }) => (
  <div className="bg-gray-100 rounded-lg shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300 w-full max-w-xs">
    {item.imageUrl ? (
      <img
        src={item.imageUrl}
        alt={item.itemName}
        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-gray-300"
      />
    ) : (
      <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full mb-3 text-gray-500 text-xs">
        No Image
      </div>
    )}
    <p className="font-medium text-gray-900 text-lg truncate">{item.itemName}</p>
    <p className="text-gray-600 text-sm truncate">{item.brand || "N/A"} - {item.color || "N/A"}</p>
    <p className="text-gray-600 text-sm truncate">{item.category || "N/A"}</p>
  </div>
);

// ----------------------------
// Lost Item Panel Component
// ----------------------------
const LostItemPanel = ({ item }) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleMatches = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await getMatchingFoundItems(item.itemId);
      setMatches(res.data);
      setIsExpanded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col">
      {/* Header Section */}
      <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
        <h3 className="text-lg font-semibold truncate">{item.itemName}</h3>
        <button
          onClick={handleToggleMatches}
          className="text-white hover:text-gray-200 transition-colors"
        >
          {isExpanded ? <FaTimes /> : <FaSearch />}
        </button>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col items-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.itemName}
            className="w-28 h-28 object-cover rounded-md mb-3 shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-200 flex items-center justify-center rounded-md mb-3 text-gray-500">
            No Image
          </div>
        )}
        <p className="text-gray-700 text-sm">Brand: {item.brand || "Unknown"}</p>
        <p className="text-gray-700 text-sm">Color: {item.color || "Unknown"}</p>
        <p className="text-gray-700 text-sm">Category: {item.category || "Unknown"}</p>
        <p className="text-gray-500 text-xs mt-2">Lost on: {item.lostDate}</p>
      </div>

      {/* Matches Section */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-300">
          {isLoading ? (
            <p className="text-center text-gray-600">Searching for matches...</p>
          ) : matches.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h4 className="text-indigo-700 font-medium text-center">Potential Matches</h4>
              {matches.map((found) => (
                <FoundItemTile key={found.itemId} item={found} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No potential matches found.</p>
          )}
        </div>
      )}
    </div>
  );
};

// ----------------------------
// Main Component
// ----------------------------
const LostItemTrack = () => {
  const [lostItems, setLostItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await lostItemListByUser();
        setLostItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLostItems();
  }, []);

  if (isLoading) return <p className="text-center mt-12 text-gray-700 text-xl">Loading your lost items...</p>;
  if (!lostItems.length) return <p className="text-center mt-12 text-gray-700 text-xl">You have no lost items.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <h2 className="text-4xl font-extrabold mb-10 text-indigo-800 text-center">Track Your Lost Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lostItems.map((item) => (
          <LostItemPanel key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LostItemTrack;