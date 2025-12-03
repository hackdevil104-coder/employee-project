
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import employeeService from "../services/employeeService";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.deleteEmployee(id);
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        alert("Employee deleted successfully!");
      } catch (err) {
        alert("Failed to delete employee. Please try again.");
        console.error("Error deleting employee:", err);
      }
    }
  };

  const handleEdit = (employee) => {
    navigate(`/edit/${employee.id}`);
  };

  const safeValue = (val) => {
    if (typeof val === "object" && val !== null) {
      return JSON.stringify(val).replace(/,/g, " ");
    }
    return val ?? "";
  };

  const handleDownloadCSV = () => {
    if (employees.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = ["ID", "First", "Last", "Email", "Phone", "Location", "Hobby"];

    const csvContent = [
      headers.join(","),
      ...employees.map((emp) =>
        [
          emp.id,
          safeValue(emp.firstName),
          safeValue(emp.lastName),
          safeValue(emp.email),
          safeValue(emp.phone),
          safeValue(emp.location),
          safeValue(emp.hobby),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="crud-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="crud-container">
        <div className="error-message">
          {error}
          <button className="retry-btn" onClick={fetchEmployees}>Retry</button>
        </div>
      </div>
    );
  }

  // ✅ Your Return UI Inserted Here
  return (
    <div className="crud-container">
      <h1 className="crud-title">CRUD Database</h1>
      
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="crud-actions">
        <button className="download-btn" onClick={handleDownloadCSV}>
          Download
        </button>

        <Link to="/add" className="add-btn">
          Add Item
        </Link>
      </div>
    </div>
  );
};

export default EmployeeList;
