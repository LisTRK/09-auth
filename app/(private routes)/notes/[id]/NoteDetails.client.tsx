"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getNoteById } from "@/lib/api/clientApi";
import css from "./NoteDetailst.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;

  return (
    <>
      {data && (
        <div className={css.container}>
          <button onClick={() => router.back()} className={css.button}>
            ← Back
          </button>

          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>Created date: {data.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetailsClient;
