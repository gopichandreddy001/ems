import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  constructor(
    private employeeService: EmployeesService,
    private router: Router
  ) {}
  public employeeReq: Employee = {
    id: '0',
    name: '',
    email: '',
    mobileNumber: 0,
    salary: 0,
    department: '',
  };

  addEmployee() {
    console.log(this.employeeReq);
    this.employeeService.addEmployee(this.employeeReq).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['employees']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
