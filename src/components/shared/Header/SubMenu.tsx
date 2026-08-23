"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SubMenu = () => {
  const pathname = usePathname();

  // Define all possible links
  const allLinks = [
    { href: "/", label: "Home" },
    { href: "/assessment", label: "Assessment" },
    { href: "/about-us", label: "About Us" },
  ];

  return (
    <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-600">
      {allLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full transition-all duration-300 
              ${
                isActive
                  ? "bg-secondary/10 text-secondary font-bold shadow-sm"
                  : "hover:bg-gray-100 hover:text-secondary"
              }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SubMenu;
