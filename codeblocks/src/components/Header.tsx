import Link from "next/link";

export default function Header() {
  return (
    <header >
      <nav className="flex justify-between items-center py-4 px-7 border-b">
        <div>
          <Link href="/">Home</Link>
        </div>
        <ul className="p-2 inline-flex">
          <li className="mr-2 ml-2"><Link href="/blocks/new">New</Link></li>
        </ul>
      </nav>
    </header>
  )
}
