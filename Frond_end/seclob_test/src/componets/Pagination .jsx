import React from "react";
import { useProductContext } from "../context/ProductContext";

const Pagination = () => {
  const { filters, setFilters, total, totalPages } = useProductContext();
  const { page, limit } = filters;

  const startItem = (page - 1) * limit + 1;
  let endItem = page * limit;
  if (endItem > total) endItem = total;

  const rowsPerPageOptions = [6, 12, 24];

  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handlers
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setFilters(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      borderTop: "1px solid #ccc",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "14px"
    }}>
    
      <div>
        {`Showing ${startItem} to ${endItem} of ${total} items`}
      </div>

    
      <div style={{ display: "flex", gap: "8px" }}>
        {pageNumbers.map(num => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            style={{
              padding: "6px 12px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              backgroundColor: num === page ? "#EDA415" : "#eee",
              color: num === page ? "#fff" : "#000",
              fontWeight: num === page ? "600" : "400",
            }}
          >
            {num}
          </button>
        ))}
      </div>

      
      <div>
        <select value={limit} onChange={handleRowsPerPageChange} style={{ padding: "6px 12px", borderRadius: "6px" }}>
          {rowsPerPageOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
