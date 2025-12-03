import React, { useEffect, useState } from "react";

const EmployeeForm = ({ employee, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    hobby: "",
  });

  const [errors, setErrors] = useState({});

 
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone ? String(employee.phone) : "",
        location: employee.location || "",
        hobby: employee.hobby || "",
      });
    }
  }, [employee]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: String(value),
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    //  Phone Validation:
    // 1) Blank not allowed
    // 2) Only digits allowed
    // 3) Must be exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Phone must contain only numbers";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Add / Update Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    
    onSubmit({ ...formData, id: employee?.id });
  };

  return (
    <div className="crud-form-container">
      <h2 className="crud-form-title">
        {isEditing ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="crud-form">
        {/* First & Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10 Digit Phone Number"
              maxLength="10"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        {/* Location & Hobby */}
        <div className="form-row">
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label>Hobby</label>
            <input
              type="text"
              name="hobby"
              value={formData.hobby}
              onChange={handleChange}
              placeholder="Enter Hobby"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>

          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
