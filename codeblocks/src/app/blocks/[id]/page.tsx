import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { db } from '@/db';
import Link from "next/link";
import DeleteButton from '@/app/components/DeleteButton';


export default async function ShowBlockPage({ params }: any) {
  const id = Number(params.id);

  const currentBlock = await db.block.findUnique({
    where: {
      id: id,
    },
  });
  
  return (
    <main>
      {currentBlock == null ? <p>Could not find data</p> : 
        <div>
          <p>Viewing: <strong style={{ color: '#66fcf1' }}>{currentBlock.title}</strong> code block</p>
          <div className="flex m-2 justify-between items-center p-4">
            <Link href={`/blocks/${id}/edit`} style={{ color: '#66fcf1' }}>Edit</Link>
            <DeleteButton id={id} />
          </div>
          <SyntaxHighlighter language="javascript" style={dracula}>
            {currentBlock.code}
          </SyntaxHighlighter>
        </div>
      }
    </main>
  );
}
