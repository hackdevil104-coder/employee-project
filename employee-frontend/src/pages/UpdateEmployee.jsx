import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeById();
  }, []);

  const fetchEmployeeById = async () => {
    try {
      const data = await employeeService.getEmployeeById(id);
      setEmployeeData(data);
    } catch (error) {
      alert("Failed to load employee details!");
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

const handleUpdate = async (updatedEmployee) => {
  try {
    await employeeService.updateEmployee(id, updatedEmployee);
    alert("✅ Employee updated successfully!");
    navigate("/");

  } catch (error) {
    alert(error.message);  // <-- This line required to show correct message
  }
};



  const handleCancel = () => {
    navigate("/");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="crud-container">
      <div className="back-button-container">
        <button className="back-btn" onClick={handleCancel}>
          ← Back to List
        </button>
      </div>

      <EmployeeForm
        employee={employeeData}   // ✅ Form fill with old data
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        isEditing={true}
      />
    </div>
  );
};

export default UpdateEmployee;
