import { useState } from "react";
import { Home, Calendar, BookOpen, HelpCircle, UserCircle, Hamburger, Menu } from "lucide-react";
import Button from "./buttons/Button";

export default function NavSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarExpanded") === "true";
    }
    return false;
  });

  const toggleSidebar = () => {
    const newState = !sidebarExpanded;
    setSidebarExpanded(newState);
    localStorage.setItem("sidebarExpanded", String(newState));
  };

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const normalizePath = (path: string) => (path === '/' ? '/home' : path);
  const currentPath = normalizePath(pathname);

  const navItems = [
    { label: "Home", path: "/home", icon: <Home size={24} /> },
    { label: "Schedule", path: "/calendar", icon: <Calendar size={24} /> },
    { label: "Courses", path: "/course", icon: <BookOpen size={24} /> },
  ];

  return (
    <div className="flex font-sans text-gray-900 min-h-screen h-full">
      <div className="flex-1 flex flex-col w-full h-full">

        {/* Navbar */}
        <header className="flex justify-between items-center h-16 px-5 bg-white fixed top-0 left-0 right-0">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="hidden md:flex flex-col hover:bg-slate-100 rounded-full overflow-hidden p-2  hover:scale-105 active:scale-95 cursor-pointer">
              <Menu size={24} className={`text-gray-600 transition-transform ${sidebarExpanded ? 'rotate-90' : ''}`} />
            </button>
            <a href="/home" className="text-2xl font-bold text-gray-900">SUNIB</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="/faq"><HelpCircle size={28} /></a>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
              <UserCircle size={28} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={`py-20 md:pb-0 transition-all duration-300 flex flex-row h-full`}
        >
          <div className={`transition-all duration-300 h-full ${sidebarExpanded ? 'md:w-60' : 'md:w-20'}`}></div>
          <div className="flex-1 min-w-0 px-9 bg-gray-50 md:rounded-2xl overflow-y-auto h-full shadow-sm z-40">
            {children}
          </div>
        </main>
        <div className="h-18 md:h-0"></div>
      </div>


      {/* Fixed Sidebar */}
      <aside
        className={`hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white transition-all duration-300
          ${sidebarExpanded ? "w-60" : "w-20"}`}
      >
        <nav className="py-2 px-2">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPath.startsWith(item.path);
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`flex items-center px-4 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 
                      ${sidebarExpanded ? "justify-start" : "justify-center"} 
                      ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100"}`}
                  >
                    {item.icon}
                    <span
                      className={`font-medium transition-all duration-300 overflow-hidden
                        ${sidebarExpanded ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 ml-0"}`}
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

      {/* Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 w-full bg-white md:hidden">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = currentPath.startsWith(item.path);
            return (
              <li key={item.path}>
                <a href={item.path} className={`flex flex-col items-center text-sm hover:scale-105 active:scale-95 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
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
