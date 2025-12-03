package com.example.employeebackend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeebackend.entity.EmployeeEntity;
import com.example.employeebackend.repository.EmployeeRepository;
import com.example.employeebackend.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeEntity createEmployee(EmployeeEntity employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists: " + employee.getEmail());
        }
        return employeeRepository.save(employee);
    }

    @Override
    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public EmployeeEntity getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found with ID: " + id));
    }

    @Override
    
    public EmployeeEntity updateEmployee(Long id, EmployeeEntity updatedEmployee) {

        EmployeeEntity existingEmployee = getEmployeeById(id);

        // 📍 If user updates email, check if someone else has same email
        if (!existingEmployee.getEmail().equals(updatedEmployee.getEmail())) {
            if (employeeRepository.existsByEmail(updatedEmployee.getEmail())) {
                throw new RuntimeException("Email already exists: " + updatedEmployee.getEmail());
            }
        }

        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setFirstName(updatedEmployee.getFirstName());
        existingEmployee.setLastName(updatedEmployee.getLastName());
        existingEmployee.setPhone(updatedEmployee.getPhone());
        existingEmployee.setLocation(updatedEmployee.getLocation());
        existingEmployee.setHobby(updatedEmployee.getHobby());

        return employeeRepository.save(existingEmployee);
    }


    @Override
    public String deleteEmployee(Long id) {
        EmployeeEntity employee = getEmployeeById(id);
        employeeRepository.delete(employee);
        return "Employee Deleted Successfully with ID: " + id;
    }
}
