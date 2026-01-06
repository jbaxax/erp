
// Tipos para las respuestas

import { api } from "@/services/api";
import { LoginResponse, LogoutResponse, MeResponse } from "../models/login.response.model";
import { LoginPayload } from "../models/login.payload.model";

export async function login(payload:LoginPayload):Promise<LoginResponse>{
    const response = await api.post<LoginResponse>('/auth/login',payload);
    return response.data;
} 

export async function logout():Promise<LogoutResponse>{
    const response = await api.post<LogoutResponse>('/auth/logout');
    return response.data;
}

export async function me():Promise<MeResponse>{
    const response = await api.get<MeResponse>('/auth/me');
    return response.data;
}

