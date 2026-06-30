'use client'
import { Barcode, Clapperboard, Dna, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { IMenu } from "./menu/admin.menu";


const navItems = [
  { to: "/admin", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/admin/product", icon: <Dna />, label: "product" },
  { to: "/admin/transaction", icon: <Clapperboard />, label: "transaction" },
  { to: "/admin/payment", icon: <Barcode />, label: "Payment" },
];

export default function Sidebar(
  { 
    isOpen,
    listMenu, 
    collapsed,
    onClose 
  } : {
    isOpen: boolean,
    listMenu: IMenu[],
    collapsed: boolean,
    onClose: () => void
  }
) {
  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-brand">
        {!collapsed && <span className="brand-name">Kuota Order App</span>}
        <button
          className="btn d-md-none ms-auto"
          style={{ color: "white" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="mt-2">
        <ul className="nav flex-column">
          {listMenu.map(({ to, icon: Icon, label }) => (
            <li className="nav-item" key={to}>
              <Link
                href={to}
                className={'nav-link'}
                onClick={onClose}
                title={collapsed ? label : ""}
              >
                <Icon/>
                <span className="nav-icon"> </span>
                {!collapsed && <span className="nav-label">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}