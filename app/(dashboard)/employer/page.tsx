"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Briefcase, Users, CheckCircle, XCircle, Clock, Loader2, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function EmployerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [appRes, jobRes] = await Promise.all([
          fetch("/api/applications/employer"),
          fetch("/api/employer/jobs"),
        ]);
        
        if (appRes.ok) {
          const data = await appRes.json();
          setApplications(data.applications);
        }
        
        if (jobRes.ok) {
          const data = await jobRes.json();
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error("Fetch data error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-inter">Employer Dashboard</h1>
          <p className="text-gray-500 font-dmsans mt-1">Manage your job postings and applicants</p>
        </div>
        <Link href="/employer/post-job">
          <Button size="lg" className="shadow-lg shadow-primary/20">
            <Plus size={18} className="mr-2" />
            Post a New Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-primary/5 border-primary/10" hoverEffect={false}>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-accent/5 border-accent/10" hoverEffect={false}>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-accent text-white flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-wider">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-orange-50 border-orange-100" hoverEffect={false}>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-orange-500 text-white flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-500 uppercase tracking-wider">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter((a: any) => a.status === "Pending").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Applicants List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 font-inter">Recent Applicants</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app: any) => (
                <Card key={app._id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 font-inter">{app.userId?.name}</h4>
                        <p className="text-sm font-medium text-gray-500">{app.userId?.email}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span className="flex items-center font-bold text-primary">
                            <Briefcase size={12} className="mr-1" />
                            {app.jobId?.title}
                          </span>
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 md:flex-col md:items-end md:justify-center gap-2">
                      <Badge 
                        variant={
                          app.status === "Accepted" ? "accent" : 
                          app.status === "Rejected" ? "gray" : "primary"
                        }
                      >
                        {app.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-green-200 text-green-600 hover:bg-green-50">
                          <CheckCircle size={16} />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50">
                          <XCircle size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="py-12 text-center border-dashed" hoverEffect={false}>
              <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-inter">No applicants yet</h3>
              <p className="text-gray-500 font-dmsans mt-1">Wait for candidates to apply to your jobs.</p>
            </Card>
          )}
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-1 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 font-inter">Your Jobs</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline">Manage All</Link>
          </div>
          
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job: any) => (
                <Card key={job._id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 font-inter text-sm">{job.title}</h4>
                    <Badge variant="accent" className="text-[10px] px-1.5">{job.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center">
                      <Users size={12} className="mr-1" />
                      {applications.filter((a: any) => a.jobId?._id === job._id).length} applicants
                    </span>
                    <Link href={`/jobs/${job._id}`}>
                      <ExternalLink size={12} className="hover:text-primary transition-colors cursor-pointer" />
                    </Link>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500 font-dmsans text-center py-6 bg-gray-50 rounded-xl border border-dashed">
                No jobs posted yet.
              </p>
            )}
            <Link href="/employer/post-job" className="block">
              <Button variant="outline" className="w-full border-dashed">
                <Plus size={16} className="mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
