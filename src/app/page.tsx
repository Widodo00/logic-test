import Link from "next/link";

export default function Home() {
  const list = [
    { label: "Challenge 1", href: "/challenge1" },
    { label: "Challenge 2", href: "/challenge2" },
    { label: "Challenge 3", href: "/challenge3" },
    { label: "Challenge 4", href: "/challenge4" },
    { label: "Challenge 5", href: "/challenge5" },
  ];

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-4xl">CODING CHALLENGES</h1>
        <p className="text-sm text-slate-500">Please select a challenge you would like to review.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {list.map((item) => (
          <Link key={item.href} href={item.href} className="button-home">
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
