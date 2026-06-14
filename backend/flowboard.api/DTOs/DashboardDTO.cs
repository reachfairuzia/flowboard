namespace flowboard.api.DTOs
{
    public class DashboardDTO
    {
        public int TotalUsers { get; set; }
        public int TotalProjects { get; set; }
        public int ToDoProjects { get; set; }
        public int InProgressProjects { get; set; }
        public int ReadyToTestProjects { get; set; }
        public int DoneProjects { get; set; }
    }
}
