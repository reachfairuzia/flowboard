import {useState, useEffect} from "react";
import {getDashboardSummary} from"../services/dashboardService";
import type {DashboardSummary} from "../types/Dashboard";
import type { Project } from "../types/Project";
import { getProjects } from "../services/ProjectService";

function Dashboard(){
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const statusOrder = ["To Do", "In Progress", "Ready To Test", "Done"];
  const statusColors: Record<string, string> = {
      "To Do": "#94a3b8",
      "In Progress": "#3b82f6",
      "Ready To Test": "#f59e0b",
      "Done": "#22c55e",
  };

  const fetchDashboard = async () => {
    try{
      const response = await getDashboardSummary();
      setDashboard(response);
    } catch(error) {
      console.error("Error fetching dashboard summary:", error);
    }
  };

  const counts: Record<string, number> = {
      "To Do": dashboard?.toDoProjects ?? 0,
      "In Progress": dashboard?.inProgressProjects ?? 0,
      "Ready To Test": dashboard?.readyToTestProjects ?? 0,
      "Done": dashboard?.doneProjects ?? 0,
  };

  const total = dashboard?.totalProjects ?? 0;

  let cumulative = 0;
  let gradientStops = "";
  for (const status of statusOrder) {
      const percentage = total > 0 ? (counts[status] / total) * 100 : 0;
      const start = cumulative;
      cumulative = cumulative + percentage;
      gradientStops = gradientStops + statusColors[status] + " " + start + "% " + cumulative + "%, ";
  }
  gradientStops = gradientStops.slice(0, -2);

  const getStatusClass = (status: string) => {
    switch(status){
        case "Done":
        return "bg-green-100 text-green-700";

        case "In Progress":
        return "bg-blue-100 text-blue-700";

        case "Ready To Test":
        return "bg-amber-100 text-amber-700";

        default:
        return "bg-slate-100 text-slate-700";
    }
  }

  const fetchRecent = async () => {
    try {
        const response = await getProjects();
        setRecentProjects(response.slice(0, 4));
    } catch (error) {
        console.error("Error fetching recent projects:", error);
    }
  };
  
  useEffect(() => {   
    fetchDashboard();
    fetchRecent();
  }, []);

  return (
    <div className="flex bg-[#f7f8f3]">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-1">Dashboard</h2>
        <p className="text-sm text-gray-500 mb-6">Overview of your team and projects.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: "#8b5cf6"}}>
            <p className="text-xs text-gray-500 font-medium mb-3">Total Users</p>
            <h3 className="text-3xl font-semibold">{dashboard?.totalUsers ?? 0}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: "#14b8a6 "}}>
            <p className="text-xs text-gray-500 font-medium mb-3">Total Projects</p>
            <h3 className="text-3xl font-semibold">{dashboard?.totalProjects ?? 0}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: "#94a3b8"}}>
            <p className="text-xs text-gray-500 font-medium mb-3">To Do</p>
            <h3 className="text-3xl font-semibold">{dashboard?.toDoProjects ?? 0}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: "#3b82f6"}}>
            <p className="text-xs text-gray-500 font-medium mb-3">In Progress</p>
            <h3 className="text-3xl font-semibold">{dashboard?.inProgressProjects ?? 0}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: "#f59e0b"}}>
            <p className="text-xs text-gray-500 font-medium mb-3">Ready to Test</p>
            <h3 className="text-3xl font-semibold">{dashboard?.readyToTestProjects ?? 0}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: "#22c55e"}}>
            <p className="text-xs text-gray-500 font-medium mb-3">Done</p>
            <h3 className="text-3xl font-semibold">{dashboard?.doneProjects ?? 0}</h3>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 font-medium mb-4">Project Status Overview</p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
            <div
              className="relative h-36 w-36 shrink-0 rounded-full"
              style={{ background: total > 0 ? `conic-gradient(${gradientStops})` : "#e2e8f0" }}>
              <div className="absolute inset-7 flex items-center justify-center rounded-full bg-white">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{total}</p>
                  <p className="text-xs text-slate-500">Projects</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {statusOrder.map((status) => (
                <div key={status} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: statusColors[status] }}/>
                  <span className="text-gray-600">{status}</span>
                  <span className="font-semibold text-gray-900">{counts[status]}</span>
                </div>
              ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-500 font-medium mb-4">Recent Projects</p>
            {recentProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">No projects found.</p>
                <p className="mt-1 text-xs text-gray-400">Create your first project to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{project.name}</span>
                    <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard