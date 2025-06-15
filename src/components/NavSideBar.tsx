import { useState, useEffect } from "react";
import { Home, Calendar, BookOpen, HelpCircle, UserCircle } from "lucide-react";

export default function NavSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarExpanded") === "true";
      setSidebarExpanded(savedState);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarExpanded;
    setSidebarExpanded(newState);
    localStorage.setItem("sidebarExpanded", String(newState));
  };

  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const normalizePath = (path: string) => (path === "/" ? "/home" : path);
  const currentPath = normalizePath(pathname);

  const navItems = [
    { label: "Home", path: "/home", icon: <Home size={24} /> },
    { label: "Schedule", path: "/calendar", icon: <Calendar size={24} /> },
    { label: "Courses", path: "/course", icon: <BookOpen size={24} /> },
  ];

  return (
    <div className="flex font-sans bg-gray-50 text-gray-900 min-h-screen">

      {/* Fixed Sidebar */}
      <aside
        className={`hidden md:block fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-sm transition-all duration-300
          ${sidebarExpanded ? "w-60" : "w-20"}`}
      >
        <nav className="py-4">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPath.startsWith(item.path);
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 
                      ${sidebarExpanded ? "justify-start" : "justify-center"} 
                      ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                  >
                    {item.icon}
                    <span
                      className={`ml-2 font-medium transition-all duration-300 overflow-hidden
                        ${sidebarExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"}`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col w-full">

        {/* Navbar */}
        <header className="flex justify-between items-center h-16 px-6 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="hidden md:flex flex-col justify-between w-7 h-5">
              <span className="block h-[3px] bg-gray-700 rounded"></span>
              <span className="block h-[3px] bg-gray-700 rounded"></span>
              <span className="block h-[3px] bg-gray-700 rounded"></span>
            </button>
            <a href="/home" className="text-2xl font-bold text-gray-900">SUNIB</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="/faq"><HelpCircle size={28} /></a>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
              <UserCircle size={28} />
            </div>
          </div>
        </header>        {/* Main Content */}
        <main
          className={`pt-20 transition-all duration-300 flex flex-row`}
        >
          <div className={`transition-all duration-300 ${sidebarExpanded ? 'md:w-60' : 'md:w-20'}`}></div>
          <div className="flex-1 min-w-0 px-5">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden z-50">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = currentPath.startsWith(item.path);
            return (
              <li key={item.path}>
                <a href={item.path} className={`flex flex-col items-center text-sm ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                  {item.icon}
                  <span className="mt-1">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

    </div>
  );
}
