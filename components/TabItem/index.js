import Link from "next/link";

export default function TabItem({ name, link, icon }) {
  return (
    <Link href={link}>
      <div className="flex items-center gap-2 text-lg text-slate-600 rounded-md p-2 py-1 hover:bg-gray-100 hover:text-slate-800 cursor-pointer">
        {icon}
				<p>{name}</p>
      </div>
    </Link>
  );
}
