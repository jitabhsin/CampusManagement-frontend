import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, markItemAsFound } from "../../Services/ItemService";
import { FaCheckCircle } from "react-icons/fa";

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
      navigate("/FoundReport");
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <FaCheckCircle size={40} className="text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 text-center">Found Item Submission</h2>
          <p className="text-gray-500 mt-2 text-center">
            Confirm the details and select the date the item was found.
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["itemId", "itemName", "category", "brand", "color", "location"].map((field) => (
              <div key={field}>
                <label className={labelStyles}>{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</label>
                <input
                  type="text"
                  name={field}
                  value={item[field]}
                  className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                  readOnly
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label htmlFor="foundDate" className={labelStyles}>
                Select Found Date *
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
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition duration-150 ease-in-out mt-6"
          >
            {isSubmitting ? "Submitting..." : "Mark as Found"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoundItemRedirected;