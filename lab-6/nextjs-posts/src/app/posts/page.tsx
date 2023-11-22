import React from 'react'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function PostsPage() {
  
  const posts = await prisma.post.findMany();

  return (
    <main className='flex min-h-screen flex-col items-center main-area'>
        <h1>Blog Posts</h1>
        {posts.map((currentPost: any) => (
          <div className="newPost" key={currentPost.id}>
            <h3>{currentPost.title}</h3>
            <p>{currentPost.body}</p>
          </div>
        ))}
    </main>
  )
}
