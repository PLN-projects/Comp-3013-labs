import { db } from "@/db";
import { redirect } from "next/navigation";


export default function BlockCreatePage() {
    // Step 1: import prisma client -> see... index.ts
    async function createBlock(formData:FormData){
        // Step 3: Create Server Action
        // Mark this function as a server action
        "use server"
        // Step 4: In server action Validate input and create new block in database

        // Get Form Data and insert into database using Prisma
        const title = formData.get("title") as string;
        const code = formData.get("code") as string; 

        code.replace(/\r\n|\r|\n/g, '\n'); // format the code to allow new lines

        await db.block.create({ data: { title, code} });
        // Step 5: Redirect user to homepage
        redirect("/");
    }

  return (
    <main>
        <form action={createBlock} className="max-w-[900px] mx-auto">
            {/* Step 2 Create Form */}
            <h3 className="font-bold m-3">Create Block</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <label className="w-12" htmlFor="title">Title: </label>
                    <input className="text-black border rounded p-2 w-full h-7 max-w-[300px]" name="title" id="title" type="text" />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code: </label>
                    <textarea className="text-black border rounded p-2 w-full h-[40vh]" name="code" id="code" />
                </div>
                <button className="self-end max-w-[100px] rounded p-2 bg-blue-600 text-white" type="submit">Create</button>
            </div>
        </form>
    </main>
  )
}
