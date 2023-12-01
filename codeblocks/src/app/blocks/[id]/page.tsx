import { db } from '@/db';
import Link from "next/link";
import DeleteButton from '@/components/DeleteButton';
import { Prism as DisplayBlock } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { notFound } from "next/navigation";

export default async function ShowBlockPage({ params }: any) {
  const id = Number(params.id);

  const currentBlock = await db.block.findUnique({
    where: {
      id: id,
    },
  });

  if (!currentBlock) {
    return notFound();
  }

  
  return (
    <main>
      {currentBlock == null ? <p>Could not find data</p> : 
        <div className='mt-4 pl-4 pr-4'>
          <p>Viewing: <strong style={{ color: '#66fcf1' }}>{currentBlock.title}</strong> code block</p>
          <div className="flex m-2 justify-evenly items-center p-4">
            <Link href={`/blocks/${id}/edit`} style={{ color: '#66fcf1' }}>Edit</Link>
            <DeleteButton id={id} />
          </div>
          <DisplayBlock language="javascript" style={dracula}>
            {currentBlock.code}
          </DisplayBlock>
        </div>
      }
    </main>
  );
}
