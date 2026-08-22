import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[#E8E8F0] bg-white">
      <div className="mx-auto flex max-w-300 flex-col items-center gap-5 px-6 py-6 sm:flex-row sm:justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2"
        >
          <CalendarDays
            size={21}
            className="text-[#6D4AFF]"
          />

          <span className="font-semibold text-[#111827]">
            EventHub
          </span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[#64748B]">
          <NavLink
            to="/"
            className="transition hover:text-[#6D4AFF]"
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className="transition hover:text-[#6D4AFF]"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="transition hover:text-[#6D4AFF]"
          >
            Register
          </NavLink>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#94A3B8]">
          © 2026 EventHub
        </p>

      </div>
    </footer>
  );
};

export default Footer;