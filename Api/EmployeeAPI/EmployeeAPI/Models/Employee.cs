namespace EmployeeAPI.Models
{
    public class Employee
    {
        //all these are properties.
        public Guid id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public long mobileNumber { get; set; }
        public long salary {  get; set; }
        public string department { get; set; }
    }
}
