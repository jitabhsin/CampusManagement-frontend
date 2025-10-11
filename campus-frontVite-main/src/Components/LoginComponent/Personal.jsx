import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../Services/LoginService";
import { getLostItemsByUser, getFoundItemsByUser } from "../../Services/ItemService";
import { ArrowLeft, UserCircle, Search, ArchiveRestore } from "lucide-react";

const Personal = () => {
  const [user, setUser] = useState(null);
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getUserDetails(),
      getLostItemsByUser(),
      getFoundItemsByUser(),
    ])
      .then(([userRes, lostItemsRes, foundItemsRes]) => {
        setUser(userRes.data);
        setLostCount(lostItemsRes.data.length);
        setFoundCount(foundItemsRes.data.length);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch your details and stats");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-600 font-medium">
        Loading your details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Return Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Return
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <UserCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Personal Details
                </h2>
                <p className="text-sm text-gray-500">
                  Your account information and activity summary.
                </p>
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Information</h3>
            <table className="min-w-full">
              <tbody className="divide-y divide-gray-200">
                {[
                  { label: "Username", value: user.username },
                  { label: "Name", value: user.personName },
                  { label: "Email", value: user.email },
                  { label: "Role", value: user.role },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 pr-4 font-semibold text-gray-700 w-1/3">
                      {item.label}
                    </td>
                    <td className="py-4 text-gray-800">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
            {/* Lost Items Card */}
            <div className="bg-red-50 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Search className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Items Reported Lost</p>
                <p className="text-2xl font-bold text-gray-800">{lostCount}</p>
              </div>
            </div>
            {/* Found Items Card */}
            <div className="bg-green-50 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <ArchiveRestore className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Items Reported Found</p>
                <p className="text-2xl font-bold text-gray-800">{foundCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;