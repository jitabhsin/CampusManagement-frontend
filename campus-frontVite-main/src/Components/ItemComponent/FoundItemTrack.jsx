import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFoundItemsByUser,
  getMatchingLostItems,
  searchLostItems,
} from "../../Services/ItemService";
import { Search, ChevronDown, Loader2, ArrowLeft, Eye } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

// Debounce hook to prevent API calls on every keystroke
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Updated LostItemTile to be theme-aware
const LostItemTile = ({ item, onClick, theme }) => (
  <div
    className={`rounded-lg p-3 flex items-center gap-3 border cursor-pointer hover:shadow-md transition-shadow ${
      theme === "light"
        ? "bg-white border-gray-200 hover:bg-gray-50"
        : "bg-gray-800 border-gray-700 hover:bg-gray-700"
    }`}
    onClick={() => onClick && onClick(item)}
  >
    <img
      src={item.imageUrl || "https://via.placeholder.com/150"}
      alt={item.itemName}
      className="w-12 h-12 object-cover rounded-md flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <p
        className={`font-semibold text-sm truncate ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        {item.itemName}
      </p>
      <p
        className={`text-xs truncate ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        Lost at: {item.location}
      </p>
    </div>
    <Eye
      className={`${
        theme === "light" ? "text-gray-400" : "text-gray-500"
      } w-4 h-4 flex-shrink-0`}
    />
  </div>
);

// Updated FoundItemPanel to be theme-aware
const FoundItemPanel = ({ item, onViewDetails, theme }) => {
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
    <div
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
        theme === "light"
          ? "bg-white hover:shadow-xl"
          : "bg-gray-800 border border-gray-700 hover:shadow-2xl"
      }`}
    >
      <div className="p-5 flex flex-col items-center text-center">
        <img
          src={item.imageUrl || "https://via.placeholder.com/150"}
          alt={item.itemName}
          className="w-32 h-32 object-cover rounded-lg mb-4 shadow-md"
        />
        <h3
          className={`text-lg font-bold mb-1 ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          {item.itemName}
        </h3>
        <p
          className={`text-sm mb-3 ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Found on: {item.foundDate}
        </p>
        <button
          onClick={() => onViewDetails(item)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 mb-2"
        >
          <Eye size={16} />
          View Details
        </button>
      </div>
      <div
        className={`border-t ${
          theme === "light" ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <button
          onClick={handleToggleMatches}
          className={`w-full flex justify-center items-center gap-2 text-sm font-semibold p-3 ${
            theme === "light"
              ? "bg-gray-50 text-blue-600 hover:bg-gray-100"
              : "bg-gray-700 text-blue-400 hover:bg-gray-600"
          } transition-colors`}
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
        <div
          className={`p-4 ${
            theme === "light"
              ? "bg-gray-50 border-t border-gray-200"
              : "bg-gray-700 bg-opacity-50 border-t border-gray-600"
          }`}
        >
          {matches.length > 0 ? (
            <div className="space-y-3">
              <h4
                className={`text-sm font-bold text-center mb-2 ${
                  theme === "light" ? "text-gray-700" : "text-white"
                }`}
              >
                Potential Matches Found
              </h4>
              {matches.map((lost) => (
                <LostItemTile
                  key={lost.lostItemId}
                  item={lost}
                  onClick={onViewDetails}
                  theme={theme}
                />
              ))}
            </div>
          ) : (
            <p
              className={`text-center text-sm py-4 ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              No potential matches found yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// DetailsModal remains unchanged, it was already theme-aware
const DetailsModal = ({ item, isOpen, onClose, theme }) => {
  if (!isOpen || !item) return null;

  const isLost = !!item.lostItemId;
  const date = isLost ? item.lostDate : item.foundDate;
  const type = isLost ? 'Lost' : 'Found';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full rounded-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} overflow-hidden`}>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {type} Item Details
            </h2>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full ${theme === 'light' ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <img
            src={item.imageUrl || "https://via.placeholder.com/300x200"}
            alt={item.itemName}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Name</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.itemName}</p>
            </div>
            <div>
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Brand</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.brand || 'N/A'}</p>
            </div>
            <div>
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Color</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.color || 'N/A'}</p>
            </div>
            <div>
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Category</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.category || 'N/A'}</p>
            </div>
            <div>
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Location</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.location || 'N/A'}</p>
            </div>
            <div>
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Date</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{date || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <span className={`font-semibold block mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Reported by</span>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.username || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// Main page component
const FoundItemTrack = () => {
  const navigate = useNavigate();
  const [foundItems, setFoundItems] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Use the debounced value for searching
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch user's found items on initial load
  useEffect(() => {
    getFoundItemsByUser()
      .then((res) => {
        setFoundItems(res.data);
        if (res.data.length > 0) {
          setUsername(res.data[0].username);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Memoize the search function
  const handleSearch = useCallback(async (query, user) => {
    if (!query.trim() || !user) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    try {
      const res = await searchLostItems(query, user);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Failed to search:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []); // Empty dependency array, this function is stable

  // EFFECT for dynamic search-as-you-type
  useEffect(() => {
    // Only search if the debounced query is present
    if (debouncedSearchQuery && username) {
      handleSearch(debouncedSearchQuery, username);
    } else {
      // Clear results if search is empty
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [debouncedSearchQuery, username, handleSearch]); // Depend on the debounced value

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === "light"
            ? "bg-gray-50 text-gray-600"
            : "bg-gray-900 text-gray-200"
        } font-medium`}
      >
        <Loader2 className="animate-spin mr-2" size={24} />
        Loading your items...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-800"
                : "text-gray-200 hover:text-gray-300"
            }`}
          >
            <ArrowLeft size={18} />
            Return
          </button>
        </div>

        <div className="text-center mb-10">
          <h2
            className={`text-3xl font-extrabold mb-2 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Track Your Found Items
          </h2>
          <p
            className={`${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            } max-w-2xl mx-auto`}
          >
            Manage items you've reported and search for matching lost items.
          </p>
        </div>

        {/* New 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: User's Found Items (Dedicated Matches) */}
          <div className="lg:col-span-7">
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              Your Reported Items ({foundItems.length})
            </h3>
            {foundItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {foundItems.map((item) => (
                  <div key={item.foundItemId}>
                    <FoundItemPanel
                      item={item}
                      onViewDetails={openModal}
                      theme={theme}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`text-center py-16 rounded-2xl shadow-xl ${
                  theme === "light"
                    ? "bg-white border border-gray-200"
                    : "bg-gray-800 border border-gray-700"
                }`}
              >
                <Search
                  className={`mx-auto mb-4 h-12 w-12 ${
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <p
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  } text-lg`}
                >
                  You haven't reported any found items yet.
                </p>
              </div>
            )}
          </div>

          {/* Column 2: Global Search (Search all Lost Items) */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="sticky top-8">
              <h3
                className={`text-2xl font-bold mb-6 ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Search for Lost Items
              </h3>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search all lost items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // onKeyPress removed for search-as-you-type
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900"
                        : "bg-gray-800 border-gray-600 text-white"
                    }`}
                  />
                  {searchLoading && (
                     <Loader2 className="animate-spin text-blue-600 absolute right-3.5 top-1/2 transform -translate-y-1/2" size={20} />
                  )}
                </div>
              </div>

              {/* Search Results */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <LostItemTile
                      key={item.lostItemId}
                      item={item}
                      onClick={openModal}
                      theme={theme}
                    />
                  ))
                ) : (
                  // Show message only if user is searching but no results
                  searchQuery && !searchLoading && (
                    <div
                      className={`p-8 rounded-xl text-center ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-800"
                      }`}
                    >
                      <p
                        className={`${
                          theme === "light" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        No matching lost items found.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailsModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        theme={theme}
      />
    </div>
  );
};

export default FoundItemTrack;