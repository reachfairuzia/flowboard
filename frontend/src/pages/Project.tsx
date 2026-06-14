import {useState, useEffect} from "react";
import {getProjects,createProject, updateProject, deleteProject} from "../services/ProjectService";
import type {Project, ProjectPayload} from "../types/Project";

function ProjectPage(){
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [editProject, setEditProject] = useState<Project | null>(null);
    const [form, setForm] = useState<ProjectPayload>({
        name: "",
        description: ""
    });
    const statusOptions = ["To Do", "In Progress", "Ready To Test", "Done"];

    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            setProjects(response);
        } catch(error){
            console.error("Error fetching projects:", error);
        }
    };

    const handleCreate = async () => {
        setEditProject(null);
        setForm({
            name: "",
            description: ""
        });
        setIsFormOpen(true);
    }

    const handleEdit = async (project: Project) => {
        setEditProject(project);
        setForm({
            id: project.id,
            name: project.name,
            description: project.description
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        const cfmed = confirm("Delete this project?")
        if(!cfmed) return;

        await deleteProject(id);
        await fetchProjects();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(editProject){
            await updateProject(form)
        } else {
            await createProject(form)
        }

        setIsFormOpen(false);
        await fetchProjects();
    };   

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

    const handleStatusChange = async (project: Project, newStatus: string) => {
        try {
            await updateProject({
                id: project.id,
                name: project.name,
                description: project.description,
                status: newStatus
            });

            setProjects((prev) =>
            prev.map((p) =>
                p.id === project.id ? { ...p, status: newStatus } : p
            )
        );
        } catch (error){
            console.error("Error updating status: ", error)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between transition-all duration-150">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                    Projects
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                    Manage and track all active projects.
                    </p>
                </div>

                <button
                    onClick={handleCreate}
                    className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white md:w-auto"
                >
                    Add Project
                </button>
            </div>
            
            <div>
                {projects.length === 0 && !isFormOpen? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">No projects found.</p>
                        <p className="mt-1 text-xs text-gray-400">Create your first project to get started.</p>
                    </div>
                    ) : (
                    !isFormOpen && (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex min-h-[180px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                >
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {project.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {project.description || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="relative shrink-0">
                                        <select
                                            value={project.status} 
                                            onChange={(e) => handleStatusChange(project, e.target.value)}
                                            className={`cursor-pointer appearance-none text-align whitespace-nowrap rounded-full pr-5 px-3 py-1 text-xs font-medium transition hover:opacity-80 ${getStatusClass(project.status)}`}>
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    
                                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
                                            ▼
                                        </span>
                                    </div>
                                </div>
                                    <div className="mt-auto flex gap-2">
                                        <button
                                        onClick={() => handleEdit(project)}
                                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                        Edit
                                        </button>

                                        <button
                                        onClick={() => handleDelete(project.id)}
                                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                                        >
                                        Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

                {isFormOpen && (
                    <div className="mt-6 rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-xl font-bold">
                            {editProject ? "Edit Project" : "Add Project"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                value={form.name}
                                onChange={(e) => setForm({...form, name: e.target.value})}
                                placeholder="Name"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                                required
                            />

                            <input
                                value={form.description}
                                onChange={(e) => setForm({...form, description: e.target.value})}
                                placeholder="Description"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                            />

                            <div className="flex gap-2">
                                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                                    Save
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectPage;