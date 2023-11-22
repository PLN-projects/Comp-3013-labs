import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
        <Link href="/">Home</Link>
        <Link href="/posts">Blog</Link>
    </header>
  )
}
