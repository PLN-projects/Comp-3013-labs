import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2 className="mt-[10px]">Sorry, your page was not found</h2>
      <Link style={{ color: '#66fcf1' }} href="/">Return to Home</Link>
    </main>
  );
}
