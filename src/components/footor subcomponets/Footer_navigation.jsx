import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer_navigation() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
      <ul className="space-y-3 ml-1">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About Us" },
          { to: "/courses", label: "Courses" },
          { to: "/event", label: "Event & News" },
          { to: "/contact", label: "Contact" },
          { to: "/feedback", label: "Feedback" },
          { to: "/admin", label: "Admin" },
        ].map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              onClick={()=>window.scrollTo(0,0)}
              className="text-sm text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
