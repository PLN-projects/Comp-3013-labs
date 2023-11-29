import React from 'react'
import { redirect } from "next/navigation";
import { db } from "@/db";

async function updateBlock(formData:FormData){

    "use server"

    const title = formData.get("title") as string;
    const code = formData.get("code") as string; 
    const id = Number(formData.get('id') as string);

    code.replace(/\r\n|\r|\n/g, '\n'); // format the code to allow new lines

    const updatedBlock = await db.block.update({
        where: { id: id},
        data: { 
            title: title,  
            code: code
        },
      })

    redirect(`/blocks/${id}`);
}

export default async function editPage( { params }: any ) {
    const id = Number(params.id);

    const currentBlock = await db.block.findUnique({
      where: {
        id: id,
      },
    });

  return (
    <main>
        <form action={updateBlock} className="max-w-[900px] mx-auto">
            {/* Step 2 Create Form */}
            <h3 className="font-bold m-3">Edit Block</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <label className="w-12" htmlFor="title">Title: </label>
                    <input defaultValue={currentBlock.title} className="text-black border rounded p-2 w-full h-7 max-w-[300px]" name="title" id="title" type="text" />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code: </label>
                    <textarea defaultValue={currentBlock.code} className="text-black border rounded p-2 w-full" name="code" id="code" />
                </div>
                {/* Hidden input for id because ID is used to search for the entry to update but the user shouldn't edit it*/}
                <input type="hidden" name="id" value={params.id} />
                <button className="self-end max-w-[100px] rounded p-2 bg-blue-600 text-white" type="submit">Update</button>
            </div>
        </form>
    </main>
  )
}
