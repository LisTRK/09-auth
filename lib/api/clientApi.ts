import { CreateNoteProps, Note, Tag } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

interface NotesDataType {
  notes: Note[],
  totalPages: number,
}

export const fetchNotes = async (search?: string, page?: number, tag?: Tag): Promise<NotesDataType> => { 
  const options = {
    params: {
        ...(search  && { search}),
        ...(page && { page}),
        ...(tag && { tag }),
        perPage: 10,
    }
};

    const response = await nextServer.get<NotesDataType>("/notes", options);

  return response.data;
};


export const createNote =async (newNote: CreateNoteProps):Promise<Note> => {
    const response = await nextServer.post<Note>('/notes', newNote);
    return response.data;
};
 

export const deleteNote =async (noteID: string):Promise<Note> => { 
  const response = await nextServer.delete<Note>(`/notes/${noteID}`);
   return response.data;
};


export const getNoteById =async (noteID: string):Promise<Note> => { 
    const response = await nextServer.get<Note>(`/notes/${noteID}`);
   return response.data;
};
  

export type AuthRequest = {
    email: string,
    password: string,
}

export const login = async (newUser: AuthRequest) => {
    const { data } = await nextServer.post<User>("/auth/login", newUser);
    return data;
}

export const register = async (newUser: AuthRequest) => {
    const { data } = await nextServer.post<User>("/auth/register", newUser);
    return data;
}

export const logout = async () => {
     await nextServer.post<User>("/auth/logout");
}

export const getMe = async ():Promise<User | null> => {
    const { data } = await nextServer.get("/users/me");
    return data;
}

export const checkSession = async (): Promise<AxiosResponse> => {
    const response = await nextServer.get("/auth/session")
    return response;
}

export interface updatedMeUserRequest {
    username: string,
}

export const updatedMe = async (user: updatedMeUserRequest): Promise<User> => {
    const { data } = await nextServer.patch("/users/me", user);
    return data;
}