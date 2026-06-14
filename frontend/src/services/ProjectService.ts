import {api} from "./api";
import type { Project } from "../types/Project";
import type { ProjectPayload } from "../types/Project";

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get("/Project");
    return response.data.data;
}

export const createProject = async (payload: ProjectPayload): Promise<Project> => {
    const response = await api.post("/Project", payload);
    return response.data.data;
}

export const updateProject = async (payload: ProjectPayload): Promise<Project> => {
    const response = await api.put("/Project", payload);
    return response.data.data;
}

export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/Project/${id}`)
}