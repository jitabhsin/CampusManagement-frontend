import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { foundItemList } from "../../Services/ItemService";

const FoundItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    foundItemList()
      .then((res) => setItemList(res.data))
      .catch((err) => console.error("Error fetching found items:", err));
  }, []);

  const returnBack = () => navigate("/AdminMenu");

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString() : "-");

  return (
    <div className="text-center p-4">
      <h2 className="mb-3">Found Item Report</h2>
      <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "red", marginBottom: "20px" }} />

      <div className="overflow-x-auto">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Found Date</th>
              <th>Entry Date</th>
              <th>Username</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {itemList.length ? (
              itemList.map((item) => (
                <tr key={item.itemId}>
                  <td>{item.itemId || "-"}</td>
                  <td>{item.itemName || "-"}</td>
                  <td>{item.category || "-"}</td>
                  <td>{item.color || "-"}</td>
                  <td>{item.brand || "-"}</td>
                  <td>{item.location || "-"}</td>
                  <td>{formatDate(item.foundDate)}</td>
                  <td>{formatDate(item.entryDate)}</td>
                  <td>{item.username || "-"}</td>
                  <td>{item.userEmail || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  No found items recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button style={{ marginTop: "20px" }} onClick={returnBack} className="btn btn-success">
        Return
      </button>
    </div>
  );
};

export default FoundItemReport;
