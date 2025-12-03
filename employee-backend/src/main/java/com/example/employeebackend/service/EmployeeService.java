package com.example.employeebackend.service;

import java.util.List;

import com.example.employeebackend.entity.EmployeeEntity;

public interface EmployeeService {

    EmployeeEntity createEmployee(EmployeeEntity employee);

    List<EmployeeEntity> getAllEmployees();

    EmployeeEntity getEmployeeById(Long id);

    EmployeeEntity updateEmployee(Long id, EmployeeEntity employee);

    String deleteEmployee(Long id);
}
