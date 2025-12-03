import axios from "axios";

const API_URL = "http://13.236.146.105:8080/api/employees";

// ✅ Correct Get All Employees API
const getAllEmployees = async () => {
  try {
    const response = await axios.get("http://13.236.146.105:8080/api/employees/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;

  } catch (error) {
    if (error.response) {
      const msg = error.response.data?.message || error.response.data;

      if (typeof msg === "string" && msg.toLowerCase().includes("email")) {
        throw new Error("Email already exists");
      }
    }

    throw new Error("Failed to add employee. Try again.");
  }
};



const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, employeeData);
    return response.data;

  } catch (error) {
    if (error.response && typeof error.response.data === "string") {
      const msg = error.response.data;

      if (msg.toLowerCase().includes("email")) {
        throw new Error("Email already exists");
      }

      throw new Error(msg);
    }

    throw new Error("Failed to update employee. Try again.");
  }
};


const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error;
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
