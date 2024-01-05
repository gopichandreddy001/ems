import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = {
    id: '0',
    name: '',
    email: '',
    mobileNumber: 0,
    salary: 0,
    department: '',
  };

  constructor(
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployeeById(id).subscribe({
            next: (response) => {
              this.employee = response;
              console.log(response);
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
    });
  }

  updateEmployee() {
    this.employeeService
      .updateEmployeeById(this.employee.id, this.employee)
      .subscribe({
        next: (response) => {
          this.router.navigate(['employees']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteEmployeeById() {
    this.employeeService.deleteEmployeeById(this.employee.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['employees']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
