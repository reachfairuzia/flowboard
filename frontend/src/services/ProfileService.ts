import {api} from "./api";
import type { User } from "../types/User";

export const getProfile = async (): Promise<User> => {
    const response = await api.get("/user");
    return response.data.data[0];
}