"use server"
import { db } from '@/db';
import { redirect } from "next/navigation";

export async function deleteBlock(id: number) {
    await db.block.delete({
        where: {
        id: Number(id),
        },
    });

    redirect("/");
}

