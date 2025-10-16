import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFoundItemsByUser, getMatchingLostItems } from "../../Services/ItemService";
import { Search, ChevronDown, Loader2, ArrowLeft } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

// New component to display a lost item match in a compact way
const LostItemTile = ({ item }) => (
  <div className={`rounded-lg p-3 flex items-center gap-3 border ${"bg-white border-gray-200"}`}>
    <img
      src={item.imageUrl || "https://via.placeholder.com/150"}
      alt={item.itemName}
      className="w-12 h-12 object-cover rounded-md"
    />
    <div>
      <p className="font-semibold text-gray-800 text-sm">{item.itemName}</p>
      <p className="text-gray-500 text-xs">Lost at: {item.location}</p>
    </div>
  </div>
);

// Panel for each "Found Item" that can find matching "Lost Items"
const FoundItemPanel = ({ item }) => {
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
      // Use the new service function to get matching lost items
      const res = await getMatchingLostItems(item.foundItemId);
      setMatches(res.data);
      setIsExpanded(true);
    } catch (err) {
      console.error("Failed to get matches:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${"hover:shadow-2xl"}`}>
      <div className={`p-5 flex flex-col items-center text-center ${"bg-white"}`}>
        <img
          src={item.imageUrl || "https://via.placeholder.com/150"}
          alt={item.itemName}
          className="w-32 h-32 object-cover rounded-lg mb-4 shadow-md"
        />
        <h3 className="text-lg font-bold text-gray-900">{item.itemName}</h3>
        <p className="text-gray-500 text-sm">Found on: {item.foundDate}</p>
      </div>
      <div className={`border-t ${"border-gray-200"}`}>
        <button
          onClick={handleToggleMatches}
          className={`w-full flex justify-center items-center gap-2 text-sm font-semibold p-3 ${"bg-gray-50 text-blue-600 hover:bg-gray-100"} transition-colors`}
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
        <div className={`p-4 ${"bg-gray-50 border-t border-gray-200"}`}>
          {matches.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-700 text-center mb-2">
                Potential Matches Found
              </h4>
              {matches.map((lost) => (
                <LostItemTile key={lost.lostItemId} item={lost} />
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

// Main page component to track all items reported as "Found" by the user
const FoundItemTrack = () => {
  const navigate = useNavigate();
  const [foundItems, setFoundItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Fetch found items instead of lost items
    getFoundItemsByUser()
      .then((res) => setFoundItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-600' : 'bg-gray-900 text-gray-200'} font-medium`}>
        Loading your items...
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900 text-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-200 hover:text-gray-300'}`}
          >
            <ArrowLeft size={18} />
            Return
          </button>
        </div>

        <div className="text-center mb-10">
          <Search className="h-10 w-10 text-blue-600 mx-auto bg-blue-100 p-2 rounded-full mb-4"/>
          <h2 className={`text-3xl font-extrabold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Track Your Found Items
          </h2>
          <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mt-2`}>Check for potential matches for the items you've found.</p>
        </div>

        {foundItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundItems.map((item) => (
              <div key={item.foundItemId} className={`${theme === 'light' ? '' : 'text-white'}`}>
                <FoundItemPanel item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 rounded-2xl shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} text-lg`}>
              You haven't reported any found items yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemTrack;