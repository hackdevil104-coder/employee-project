import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="crud-table-container">
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Hobby</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-data">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((employee, index) => (
              <tr key={employee.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{employee.id}</td>
                <td>{employee.firstName || employee.name?.split(' ')[0] || ''}</td>
                <td>{employee.lastName || employee.name?.split(' ')[1] || ''}</td>
                <td>{employee.email}</td>
                <td>{employee.phone || ''}</td>
                <td>{employee.location || employee.address || ''}</td>
                <td>{employee.hobby || employee.position || ''}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(employee.id)}
                    >
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
