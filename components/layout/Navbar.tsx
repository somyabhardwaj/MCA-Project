"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/Button";
import { Briefcase, Building, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../ui/Button";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Briefcase size={24} />
            </div>
            <span className="text-xl font-bold font-inter text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Companies
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            {loading ? (
              <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-100" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={user.role === "EMPLOYEE" ? "/employee/dashboard" : "/employer/dashboard"}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                {user.role === "EMPLOYER" && (
                  <Link href="/employer/post-job">
                    <Button size="sm">Post a Job</Button>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="group relative">
                  <button className="text-sm font-medium text-gray-600 hover:text-primary">Login</button>
                  <div className="invisible absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-gray-200 bg-white p-2 shadow-lg group-hover:visible transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <Link
                      href="/auth/employee/login"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      As Employee
                    </Link>
                    <Link
                      href="/auth/employer/login"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      As Employer
                    </Link>
                  </div>
                </div>
                <Link href="/auth/employee/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 p-4 space-y-4 transition-all duration-300 transform",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <Link href="/jobs" className="block text-base font-medium text-gray-600">
          Find Jobs
        </Link>
        <Link href="/companies" className="block text-base font-medium text-gray-600">
          Companies
        </Link>
        <hr className="border-gray-100" />
        {user ? (
          <>
            <Link
              href={user.role === "EMPLOYEE" ? "/employee/dashboard" : "/employer/dashboard"}
              className="block text-base font-medium text-gray-600"
            >
              Dashboard
            </Link>
            <button onClick={logout} className="block text-base font-medium text-red-600">
              Logout
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <Link href="/auth/employee/login" className="block text-base font-medium text-gray-600">
              Login as Employee
            </Link>
            <Link href="/auth/employer/login" className="block text-base font-medium text-gray-600">
              Login as Employer
            </Link>
            <Link href="/auth/employee/signup">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
