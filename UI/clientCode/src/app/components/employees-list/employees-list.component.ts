import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: EmployeesService) {}
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
