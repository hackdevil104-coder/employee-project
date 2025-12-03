import React from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const navigate = useNavigate();

  // ⬇️ Add Form Submit Logic
 const handleAddEmployee = async (employeeData) => {
 try {
  //try is the best can do it 
  await employeeService.createEmployee(employeeData);

  
  alert("✅ Employee Added Successfully!");
  navigate("/");

} catch (error) {

  // Email duplicate case
  if (error.message.includes("Email")) {
    alert("❌ Email already exists");
  } else {
    alert("❌ Failed to add employee. Try again.");
  }

  console.error("Error adding employee:", error);
}

};


  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="crud-container">
      <button className="back-btn" onClick={handleCancel}>
          ← Back to List
        </button>
      <EmployeeForm
        onSubmit={handleAddEmployee} // ✅ Add logic connect
        onCancel={handleCancel}
        isEditing={false} // Add mode
      />
    </div>
  );
};

export default AddEmployee;
