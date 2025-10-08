import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, markItemAsFound } from "../../Services/ItemService";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const FoundItemRedirected = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [foundDate, setFoundDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getItemById(id)
      .then((res) => setItem(res.data))
      .catch(() => setError("Could not load item details."));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foundDate) return setError("Please select a valid found date.");
    setIsSubmitting(true);

    try {
      await markItemAsFound(item.itemId, foundDate);
      alert("Item successfully marked as found!");
      navigate("/LostReport");
    } catch {
      setError("Failed to mark item as found. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!item) return <div className="text-center mt-10">Loading item...</div>;

  const inputStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        {/* Left: Icon + Title */}
        <div className="flex flex-col items-center lg:items-start justify-start lg:w-1/4 text-center lg:text-left">
          <FaCheckCircle size={48} className="text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Found Item Submission
          </h2>
          <p className="text-gray-500 mb-4">
            Review the item details and select the date it was found.
          </p>
        </div>

        {/* Center: Form */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Return Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 mb-2"
          >
            <FaArrowLeft /> Return
          </button>

          {error && <p className="text-red-500 text-center lg:text-left">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-gray-700">Item Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["itemId", "itemName", "category", "brand", "color", "location"].map(
                (field) => (
                  <div key={field}>
                    <label className={labelStyles}>
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={item[field]}
                      className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                      readOnly
                    />
                  </div>
                )
              )}

              <div>
                <label htmlFor="foundDate" className={labelStyles}>
                  Found Date *
                </label>
                <input
                  type="date"
                  id="foundDate"
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full lg:w-1/3 bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition self-center"
            >
              {isSubmitting ? "Submitting..." : "Mark as Found"}
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex-shrink-0 lg:w-1/4 flex items-center justify-center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt="Item"
              className="w-64 h-64 object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-xl shadow-md">
              <p className="text-gray-500 text-center">No image available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItemRedirected;
