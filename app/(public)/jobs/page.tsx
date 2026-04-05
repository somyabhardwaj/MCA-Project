"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/job/JobCard";
import JobFilters from "@/components/job/JobFilters";
import { Search, Loader2 } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchJobs = async (currentFilters = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(currentFilters as any).toString();
      const res = await fetch(`/api/jobs?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("Fetch jobs error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <JobFilters onFilter={(newFilters) => setFilters(newFilters)} />
        </div>

        {/* Job Listings */}
        <div className="w-full lg:w-3/4 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 font-inter">
              {loading ? "Searching..." : `${jobs.length} Jobs Found`}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 font-dmsans">
              <span>Sort by:</span>
              <select className="bg-transparent font-semibold text-gray-900 focus:outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-gray-500 font-medium">Finding the best jobs for you...</p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job: any) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm text-center px-6">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <Search size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 font-inter">No jobs found</h2>
              <p className="mt-2 text-gray-500 font-dmsans max-w-md">
                We couldn't find any jobs matching your current filters. Try adjusting your search criteria or clear all filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
