import Link from "next/link";
import { Briefcase, Globe, Mail, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Briefcase size={24} />
              </div>
              <span className="text-xl font-bold font-inter text-gray-900">JobPortal</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed font-dmsans">
              The world's largest job portal with over 1M+ active jobs from top companies around the world.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 font-inter uppercase tracking-wider">For Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/jobs" className="text-sm text-gray-500 hover:text-primary transition-colors font-dmsans">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/employee/dashboard" className="text-sm text-gray-500 hover:text-primary transition-colors font-dmsans">
                  My Applications
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-sm text-gray-500 hover:text-primary transition-colors font-dmsans">
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 font-inter uppercase tracking-wider">For Employers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/employer/post-job" className="text-sm text-gray-500 hover:text-primary transition-colors font-dmsans">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employer/dashboard" className="text-sm text-gray-500 hover:text-primary transition-colors font-dmsans">
                  Browse Applicants
                </Link>
              </li>
              <li>
                <Link href="/employer/dashboard" className="text-sm text-gray-500 hover:text-primary transition-colors font-dmsans">
                  Employer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 font-inter uppercase tracking-wider">Connect With Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 font-dmsans">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-500 hover:text-primary font-dmsans">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-primary font-dmsans">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
