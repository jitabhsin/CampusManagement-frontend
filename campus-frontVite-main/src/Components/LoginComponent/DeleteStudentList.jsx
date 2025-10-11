import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents, deleteStudentByUsername } from "../../Services/LoginService";
import { getAllLostItems, getAllFoundItems } from "../../Services/ItemService";
import { User, Search, ArchiveRestore, X, AlertTriangle } from "lucide-react";

const DeleteStudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [allItems, setAllItems] = useState({ lost: [], found: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for Delete Modal
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  // State for Details Modal
  const [studentToView, setStudentToView] = useState(null);
  const [studentStats, setStudentStats] = useState({ lost: 0, found: 0 });

  // Fetch all necessary data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [studentsRes, lostItemsRes, foundItemsRes] = await Promise.all([
          getAllStudents(),
          getAllLostItems(),
          getAllFoundItems(),
        ]);
        setStudents(studentsRes.data);
        setAllItems({ lost: lostItemsRes.data, found: foundItemsRes.data });
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Handle opening the details modal
  const handleViewDetails = (student) => {
    const lostCount = allItems.lost.filter(item => item.username === student.username).length;
    const foundCount = allItems.found.filter(item => item.username === student.username).length;
    
    setStudentStats({ lost: lostCount, found: foundCount });
    setStudentToView(student);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudentByUsername(studentToDelete.username);
      setStudents(students.filter((s) => s.username !== studentToDelete.username));
      setStudentToDelete(null); // Close delete modal
    } catch (err) {
      alert("Failed to delete student");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-600 font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-40 text-red-600 font-medium">
        {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow-sm transition duration-200"
        >
          &larr; Return
        </button>
      </div>

      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Student Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr 
                  key={student.username} 
                  className="hover:bg-gray-50 transition duration-150 cursor-pointer"
                  onClick={() => handleViewDetails(student)}
                >
                  <td className="px-6 py-4">{student.username}</td>
                  <td className="px-6 py-4">{student.personName}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${student.role === "Admin" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                      {student.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        setStudentToDelete(student);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-sm transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-6 text-gray-500">No students found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Student Details Modal */}
      {studentToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
            <div className="p-6 relative">
              <button
                onClick={() => setStudentToView(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4 mb-6">
                 <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-8 w-8 text-blue-600" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-gray-800">{studentToView.personName}</h3>
                    <p className="text-sm text-gray-500">{studentToView.email}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-red-50 p-4 rounded-lg text-center">
                    <Search className="h-6 w-6 text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-red-800 font-semibold">Items Lost</p>
                    <p className="text-4xl font-bold text-red-900">{studentStats.lost}</p>
                 </div>
                 <div className="bg-green-50 p-4 rounded-lg text-center">
                    <ArchiveRestore className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800 font-semibold">Items Found</p>
                    <p className="text-4xl font-bold text-green-900">{studentStats.found}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
             <div className="mx-auto bg-red-100 rounded-full h-12 w-12 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
             </div>
            <h3 className="text-xl font-bold my-4 text-gray-800">
              Delete Student?
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete <strong>{studentToDelete.username}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setStudentToDelete(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteStudentList;