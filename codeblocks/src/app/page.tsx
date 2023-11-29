import { db } from "@/db"; 
import Link from "next/link";

export default async function Home() {
  const blocks = await db.block.findMany();
  return (
    <main>
      <div className="flex m-2 justify-between items-center p-4">
        <h1 className="text-xl fond-bold">Code Blocks</h1>
        <p>Current Blocks</p>
      </div>
      <ul>
        {blocks.map(block => <li className="flex justify-between items-center pb-2 pt-2 pl-8 pr-8 border-gray-300 border-2 rounded m-5 rounded-full bg-teal-600 text-white" key={block.id}>
          <span>{block.title}</span>
          <Link className="hover:border-b-2" href={`/blocks/${block.id}`}>View</Link>
          </li>)}
      </ul>
    </main>
  )
}