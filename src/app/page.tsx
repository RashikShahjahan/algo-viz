import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Link href="/search">Search Algorithms</Link>
      <Link href="/sort">Sort Algorithms</Link>
      <Link href="/planning">Path Planning Algorithms</Link>
    </div>
);
}
