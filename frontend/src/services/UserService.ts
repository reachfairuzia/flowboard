import {api} from "./api";
import type { User } from "../types/User";
import type { UserPayload } from "../types/User";


export const getUsers = async (): Promise<User[]> => {
    const response = await api.get("/User");
    return response.data.data;
}

export const createUser = async (payload: UserPayload): Promise<User> => {
    const response = await api.post("/User", payload);
    return response.data.data;
}

export const updateUser = async (payload: UserPayload): Promise<User> => {
    const response = await api.put("/User", payload);
    return response.data.data;
}

export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/User/${id}`)
}