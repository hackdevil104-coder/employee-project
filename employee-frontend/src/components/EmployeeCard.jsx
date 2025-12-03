import React from 'react';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{employee.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{employee.position}</h6>
          <p className="card-text">
            <strong>Email:</strong> {employee.email}<br />
            <strong>Department:</strong> {employee.department}<br />
            {employee.salary && (
              <>
                <strong>Salary:</strong> ${employee.salary.toLocaleString()}<br />
              </>
            )}
            {employee.phone && (
              <>
                <strong>Phone:</strong> {employee.phone}<br />
              </>
            )}
            {employee.address && (
              <>
                <strong>Address:</strong> {employee.address}
              </>
            )}
          </p>
        </div>
        <div className="card-footer">
          <div className="btn-group w-100" role="group">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEdit(employee)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(employee.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
