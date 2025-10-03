import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../Services/ItemService"; // FIXED

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (students.length === 0) return <p>No students found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.username}>
              <td className="py-2 px-4 border">{student.username}</td>
              <td className="py-2 px-4 border">{student.personName}</td>
              <td className="py-2 px-4 border">{student.email}</td>
              <td className="py-2 px-4 border">{student.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
