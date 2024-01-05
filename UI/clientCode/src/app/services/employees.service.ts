import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees');
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(
      this.baseApiUrl + '/api/employees',
      addEmployeeRequest
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }

  updateEmployeeById(
    id: string,
    updatedEmployee: Employee
  ): Observable<Employee> {
    return this.http.put<Employee>(
      this.baseApiUrl + '/api/employees/' + id,
      updatedEmployee
    );
  }

  deleteEmployeeById(id: string): Observable<Object> {
    return this.http.delete<Object>(this.baseApiUrl + '/api/employees/' + id);
  }
}
