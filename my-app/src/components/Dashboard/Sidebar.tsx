import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList } from "react-icons/fi";
import { TbBusinessplan } from "react-icons/tb";
import { GiSolidLeaf } from "react-icons/gi";
import AccountToggle from './AccountToggle';

interface NavButtonProps {
  selected: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  path: string;
}

const NavButton = ({ selected, Icon, title, path }: NavButtonProps) => {
  return (
    <Link
      href={path}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-colors ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen ml-4 w-56 fixed">
      <div className="border-b mb-5 mt-6 pb-5 border-stone-300 flex items-center gap-1">
        <GiSolidLeaf className="text-4xl text-green-600/80" />
        <h1 className="text-2xl pl-4 font-semibold text-green-700/80">Budgetly</h1>
      </div>

      <AccountToggle />
      <div className="space-y-3">
        <NavButton 
          Icon={TbBusinessplan} 
          selected={pathname === "/dashboard/budgets"} 
          title="Budgets" 
          path="/dashboard/budgets" 
        />
        <NavButton 
          Icon={FiList} 
          selected={pathname === "/dashboard/transactions"} 
          title="Transactions" 
          path="/dashboard/transactions" 
        />
      </div>
    </div>
  );
}