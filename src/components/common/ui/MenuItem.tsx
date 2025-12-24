
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface MenuItemProps {
  item: {
    submenu?: MenuItemProps["item"][];
    icon?: React.ComponentType<{ className?: string }>;
    link?: string;
    title: string;
    badge?: number;
    iconColor?: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = item.link ? pathname === item.link : false;
  const [open, setOpen] = useState(false);
  const { hasPermission } = useAuthStore();

  // Filter submenu items based on permissions
  const filteredSubmenu = item.submenu?.filter((subItem) => {
    const resource = subItem.link?.split("/")[1];
    return resource
      ? hasPermission(resource, "manage") ||
      hasPermission(resource, "delete") ||
      hasPermission(resource, "edit") ||
      hasPermission(resource, "create")
      : true;
  });

  const hasSubmenu = filteredSubmenu && filteredSubmenu.length > 0;
  const Icon = item.icon;

  useEffect(() => {
    // Basic check for active submenu parent usually involves checking if pathname starts with item.link
    // but strict equality works for exact matches. For parent menus, often we want 'startsWith'.
    // If original logic was strict equality, I'll keep it, but open if active.

    // Check if any child is active to auto-open
    if (hasSubmenu && filteredSubmenu?.some(sub => sub.link && pathname.startsWith(sub.link))) {
      setOpen(true);
    }
    else if (isActive) {
      setOpen(true); // Expand submenu if active
    }
  }, [isActive, pathname, hasSubmenu, filteredSubmenu]);

  return (
    <li className="my-0.5">
      <Link
        to={item.link || "#"}
        onClick={(e) => {
          if (hasSubmenu) {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        className={`flex items-center py-2.5 px-4 rounded-md transition-colors duration-200 text-sm font-medium ${isActive
            ? "bg-gray-100 text-blue-600 shadow-sm"
            : "hover:bg-gray-50 text-gray-700"
          }`}
      >
        {Icon && <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${item.iconColor}`} />}
        <span className="truncate">{item.title}</span>
        {item.badge !== undefined && item.badge > 0 && (
          <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
            {item.badge}
          </span>
        )}
        {hasSubmenu && (
          <ChevronDown
            className={`ml-auto w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""
              }`}
          />
        )}
      </Link>
      {hasSubmenu && open && (
        <ul className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200">
          {filteredSubmenu?.map((sub, index) => (
            <MenuItem key={index} item={sub} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;