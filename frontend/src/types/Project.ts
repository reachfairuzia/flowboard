export interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
}

export interface ProjectPayload {
    id?: string;
    name: string;
    description?: string;
    status?: string;
}