import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Home,
  Users,
  User,
  Book,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: Home,
        label: "Dasboard",
        href: "/dashboard",
        visible: ["admin", "teacher"],
      },
      {
        icon: User,
        label: "Task",
        href: "/dashboard/task",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Book,
        label: "Project",
        href: "/dashboard/project",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: UserCircle,
        label: "Profile",
        href: "/dashboard/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LogOut,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export default function Menue({ triggerLogoutModal }) {
  return (
    <div>
      {menuItems.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-4 justify-between p-3">
          <span className="block text-sm font-semibold mb-2 text-black">
            {section.title}
          </span>
          {section.items.map((item, itemIdx) => {
            const Icon = item.icon;
            const isLogout = item.label.toLowerCase() === "logout";

            const hoverClasses = "hover:bg-gray-100 hover:text-amber-500 transition-colors duration-200 rounded-md px-2";

            return isLogout ? (
              <button
                key={itemIdx}
                onClick={triggerLogoutModal}
                className={`flex items-center gap-2 py-2 justify-center lg:justify-start w-full text-left ${hoverClasses}`}
              >
                <Icon size={20} color="black" />
                <span className="text-black hidden lg:block">{item.label}</span>
              </button>
            ) : (
              <Link
                href={item.href}
                key={itemIdx}
                className={`flex items-center gap-2 py-2 justify-center lg:justify-start w-full ${hoverClasses}`}
              >
                <Icon size={20} color="black" />
                <span className="text-black hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
