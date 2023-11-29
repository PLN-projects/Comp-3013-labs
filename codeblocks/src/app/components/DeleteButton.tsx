import React from 'react'
import { redirect } from "next/navigation";
import { db } from '@/db';

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteButtonProps) {

    // for some odd reason this doesn't work as a button event but it works if it's a form submission
    async function handleDelete() {
    "use server"

    await db.block.delete({
        where: {
        id: id,
        },
    });

    redirect("/");
    }

    return (
    <form action={handleDelete}>
        <button style={{ color: '#66fcf1' }} type="submit">Delete</button>
    </form>
    )
}
