package com.example.employeebackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeebackend.entity.EmployeeEntity;
import com.example.employeebackend.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ✅ Create Employee
    @PostMapping
    public ResponseEntity<EmployeeEntity> createEmployee(@RequestBody EmployeeEntity employeeDto) {
        EmployeeEntity savedEmployee = employeeService.createEmployee(employeeDto);
        return ResponseEntity.ok(savedEmployee);
    }

    // ✅ Get All Employees
    @GetMapping("/getAll")
    public ResponseEntity<List<EmployeeEntity>> getAllEmployees() {
        List<EmployeeEntity> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // ✅ Get Employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable Long id) {
        EmployeeEntity employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    // ✅ Update Employee (DTO Version) – Correct Code
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@PathVariable Long id,
                                                      @RequestBody EmployeeEntity employeeDto) {
        EmployeeEntity updatedEmployee = employeeService.updateEmployee(id, employeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }

    // ✅ Delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        String message = employeeService.deleteEmployee(id);
        return ResponseEntity.ok(message);
    }
}
