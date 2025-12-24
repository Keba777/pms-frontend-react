
import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import MenuItem from "@/components/common/ui/MenuItem";
import menuItems from "./menuItems";
import { useAuthStore } from "@/store/authStore";
const logo = "/images/logo.jpg";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const user = useAuthStore((state) => state.user);
  const { hasPermission } = useAuthStore();

  const [chatBadge, setChatBadge] = useState(0);
  const [groupChatBadge, setGroupChatBadge] = useState(0);

  // Determine if current user is HR (case-insensitive, includes "hr")
  const isHR = Boolean(
    user?.role?.name && user.role.name.toLowerCase().includes("hr")
  );

  // Fetch unread message count for “Chat” badge
  useEffect(() => {
    if (!user) {
      setChatBadge(0);
      setGroupChatBadge(0);
      return;
    }
    // Logic for fetching badges (commented out in original)
  }, [user]);

  const menuItemsWithBadge = menuItems.map((item) => {
    if (item.title === "Chat") return { ...item, badge: chatBadge };
    if (item.title === "Team Chats") return { ...item, badge: groupChatBadge };
    return item;
  });

  // Apply your existing permission-based filtering
  const filteredMenuItems = menuItemsWithBadge.filter((item) => {
    // HR-only dashboard item (keep as you had it)
    if (item.title === "HR Dashboard") {
      return user?.role?.name === "HR Manager" || isHR;
    }

    // Exclude the root "/" menu item for HR users
    if (item.link === "/") {
      return !isHR;
    }

    if (item.submenu) {
      const filteredSub = item.submenu.filter((s) => {
        const resource = s.link?.split("/")[1];
        return resource
          ? hasPermission(resource, "manage") ||
          hasPermission(resource, "delete") ||
          hasPermission(resource, "edit") ||
          hasPermission(resource, "create")
          : true;
      });
      return filteredSub.length > 0;
    }

    const resource = item.link?.split("/")[1];
    return resource
      ? hasPermission(resource, "manage") ||
      hasPermission(resource, "delete") ||
      hasPermission(resource, "edit") ||
      hasPermission(resource, "create")
      : true;
  });

  return (
    <aside
      id="layout-menu"
      className={`${isOpen ? "fixed top-0 bottom-0 z-50" : "hidden"
        } lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:block lg:w-64 font-medium bg-white shadow-md transition-all duration-300 overflow-y-auto`}
    >
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 right-4 text-primary"
      >
        <FiX size={24} />
      </button>

      <div className="flex items-center justify-center ">
        {/* Logo: send HR users to /hrm, others to / */}
        <Link to={isHR ? "/hrm" : "/"} className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-24"
          />
        </Link>
      </div>

      <div className="px-2">
        <h2 className="w-full bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded inline-flex items-center">
          Raycon Construction
        </h2>
      </div>

      <ul className="py-1 px-3">
        {filteredMenuItems.map((item, idx) => (
          <MenuItem key={idx} item={item} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
