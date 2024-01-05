using EmployeeAPI.Data;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("/api/employees")]
    public class EmployeesController : Controller
    {
        private readonly EmployeeAPIDbContext employeeDbContext;

        public EmployeesController(EmployeeAPIDbContext employeeAPIDbContext)
        {
            this.employeeDbContext = employeeAPIDbContext;   
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees=await this.employeeDbContext.Employees.ToListAsync();
            return Ok(employees);   
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            employeeRequest.id=Guid.NewGuid();
            await employeeDbContext.Employees.AddAsync(employeeRequest);
            await employeeDbContext.SaveChangesAsync();
            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployeeById([FromRoute] Guid id)
        {
            Employee reqEmp=await employeeDbContext.Employees.FirstOrDefaultAsync(x => x.id == id);
            if (reqEmp == null)
            {
                return NotFound();
            }
            return Ok(reqEmp);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployeeById([FromRoute] Guid id,[FromBody] Employee updatedEmployee)
        {
            var employee=await employeeDbContext.Employees.FindAsync(id);
            if(employee == null) { 
                return NotFound();
            }
            employee.name=updatedEmployee.name;
            employee.email=updatedEmployee.email;
            employee.mobileNumber = updatedEmployee.mobileNumber;
            employee.department=updatedEmployee.department; 
            employee.salary= updatedEmployee.salary;

            await employeeDbContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await employeeDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            employeeDbContext.Employees.Remove(employee);
            await employeeDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
