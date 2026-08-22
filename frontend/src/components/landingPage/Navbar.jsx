import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const closeMenu = () => {
    setShowNavBar(false);
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <nav className="relative z-50 border-b border-[#E8E8F0] bg-white">
      <div className="mx-auto flex h-16 max-w-300 items-center justify-between px-5 md:h-18 md:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <NavLink
            to="/"
            className="text-xl font-bold text-[#5B4BFF]"
          >
            EventHub
          </NavLink>
        </motion.div>

        {/* Desktop navigation */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden items-center gap-8 md:flex"
        >
          <NavLink
            to="/"
            className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#5B4BFF]"
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#5B4BFF]"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#5B4BFF]"
          >
            Signup
          </NavLink>
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowNavBar(true)}
          className="text-[#111827] md:hidden"
        >
          <Menu size={26} />
        </motion.button>

        {/* Mobile menu */}
        <AnimatePresence>
          {showNavBar && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute left-0 top-0 flex min-h-60 w-full flex-col gap-5 bg-white px-6 py-10 shadow-lg md:hidden"
            >
              {/* Close */}
              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                onClick={closeMenu}
                className="absolute right-5 top-4 text-[#111827]"
              >
                <X size={24} />
              </motion.button>

              {/* Mobile links */}
              <motion.div
                variants={itemVariants}
                transition={{ delay: 0.08 }}
              >
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className="text-base font-medium text-[#64748B]"
                >
                  Home
                </NavLink>
              </motion.div>

              <motion.div
                variants={itemVariants}
                transition={{ delay: 0.14 }}
              >
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="text-base font-medium text-[#64748B]"
                >
                  Login
                </NavLink>
              </motion.div>

              <motion.div
                variants={itemVariants}
                transition={{ delay: 0.2 }}
              >
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="text-base font-medium text-[#64748B]"
                >
                  Signup
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;