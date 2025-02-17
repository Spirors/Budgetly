import React from "react";
import { FiHome, FiList} from "react-icons/fi";
import { TbBusinessplan } from "react-icons/tb";
import { GiSolidLeaf } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";


import AccountToggle from './AccountToggle';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen ml-4">
      <span className="border-b mb-5 mt-6 pb-5 border-stone-300 flex items-center gap-1">
        <GiSolidLeaf className="text-4xl text-green-600/80" />
        <h1 className="text-2xl pl-4 font-semibold text-green-700/80">Budgetly</h1>
      </span>

      <AccountToggle />
      <div className="space-y-3">
        {/* <NavButton Icon={FiHome} selected={location.pathname === "/dashboard"} title="Dashboard" path="/dashboard" /> */}
        <NavButton Icon={TbBusinessplan} selected={location.pathname === "/dashboard/budget"} title="Budget" path="/dashboard/budget" />
        <NavButton Icon={FiList} selected={location.pathname === "/dashboard/transaction"} title="Transaction" path="/dashboard/transaction" />
      </div>
    </div>
  );
}

const NavButton = ({
  selected,
  Icon,
  title,
  path,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};