import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/ures";
import { Note, Tag } from "@/types/note";
import { AxiosResponse } from "axios";


export const getMeServer = async ():Promise<User | null> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get("/users/me", {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    return data;
}



interface NotesDataType {
  notes: Note[],
  totalPages: number,
}
export const fetchNotesServer = async (search?: string, page?: number, tag?: Tag): Promise<NotesDataType> => { 
    const cookieStore = await cookies();
  const options = {
    params: {
        ...(search  && { search}),
        ...(page && { page}),
        ...(tag && { tag }),
        perPage: 10,
      },
      headers: {
            Cookie: cookieStore.toString()
        }
};

    const response = await nextServer.get<NotesDataType>("notes", options);

  return response.data;


};


export const checkServerSession = async (): Promise<AxiosResponse> => {
    const cookieStore = await cookies();
    const response = await nextServer.get("/auth/session", {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    return response;
}


export const getNoteByIdServer = async (noteID: string): Promise<Note> => { 
    const cookieStore = await cookies();
    const response = await nextServer.get<Note>(`/notes/${noteID}`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
   return response.data;
  };