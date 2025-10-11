import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLostItemsByUser,
  getMatchingFoundItems,
} from "../../Services/ItemService";
import { Search, ChevronDown, Loader2, ArrowLeft } from "lucide-react";

const FoundItemTile = ({ item }) => (
  <div className="bg-white rounded-lg p-3 flex items-center gap-3 border border-gray-200">
    <img
      src={item.imageUrl || "https://via.placeholder.com/150"}
      alt={item.itemName}
      className="w-12 h-12 object-cover rounded-md"
    />
    <div>
      <p className="font-semibold text-gray-800 text-sm">{item.itemName}</p>
      <p className="text-gray-500 text-xs">Found at: {item.location}</p>
    </div>
  </div>
);

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
      const res = await getMatchingFoundItems(item.lostItemId);
      setMatches(res.data);
      setIsExpanded(true);
    } catch (err) {
      console.error("Failed to get matches:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="p-5 flex flex-col items-center text-center">
        <img
          src={item.imageUrl || "https://via.placeholder.com/150"}
          alt={item.itemName}
          className="w-32 h-32 object-cover rounded-lg mb-4 shadow-md"
        />
        <h3 className="text-lg font-bold text-gray-900">{item.itemName}</h3>
        <p className="text-gray-500 text-sm">Lost on: {item.lostDate}</p>
      </div>
      <div className="border-t border-gray-200">
        <button
          onClick={handleToggleMatches}
          className="w-full flex justify-center items-center gap-2 text-sm font-semibold p-3 bg-gray-50 text-blue-600 hover:bg-gray-100 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <span>{isExpanded ? "Hide Matches" : "Find Matches"}</span>
              <ChevronDown
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {matches.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-700 text-center mb-2">
                Potential Matches Found
              </h4>
              {matches.map((found) => (
                <FoundItemTile key={found.foundItemId} item={found} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-sm py-4">
              No potential matches found yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const LostItemTrack = () => {
  const navigate = useNavigate();
  const [lostItems, setLostItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLostItemsByUser()
      .then((res) => setLostItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-600 font-medium">
        Loading your items...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Return
          </button>
        </div>

        <div className="text-center mb-10">
            <Search className="h-10 w-10 text-blue-600 mx-auto bg-blue-100 p-2 rounded-full mb-4"/>
            <h2 className="text-3xl font-extrabold text-gray-800">
                Track Your Lost Items
            </h2>
            <p className="text-gray-500 mt-2">Check for potential matches for your lost items.</p>
        </div>

        {lostItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lostItems.map((item) => (
              <LostItemPanel key={item.lostItemId} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
            <p className="text-gray-700 text-lg">
              You haven't reported any lost items yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostItemTrack;