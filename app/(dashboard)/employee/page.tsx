"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Briefcase, MapPin, Clock, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EmployeeDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications/my");
        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Fetch applications error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchApplications();
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
          <h1 className="text-3xl font-bold text-gray-900 font-inter">Welcome, {user?.name}</h1>
          <p className="text-gray-500 font-dmsans mt-1">Manage your job applications and track your progress</p>
        </div>
        <Link href="/jobs">
          <Button>Find More Jobs</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-primary/5 border-primary/10" hoverEffect={false}>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wider">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6" hoverEffect={false}>
            <h3 className="font-bold text-gray-900 font-inter mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/jobs" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                <ExternalLink size={16} className="mr-2" />
                Browse new jobs
              </Link>
              <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                <ExternalLink size={16} className="mr-2" />
                Update profile
              </Link>
              <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                <ExternalLink size={16} className="mr-2" />
                Job alerts settings
              </Link>
            </div>
          </Card>
        </div>

        {/* Applications List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 font-inter mb-6">Your Applications</h2>
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app: any) => (
                <Card key={app._id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <Link href={`/jobs/${app.jobId?._id}`} className="hover:text-primary">
                          <h4 className="font-bold text-gray-900 font-inter">{app.jobId?.title || "Deleted Job"}</h4>
                        </Link>
                        <p className="text-sm font-medium text-gray-500">{app.jobId?.company}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {app.jobId?.location}
                          </span>
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-2">
                      <Badge 
                        variant={
                          app.status === "Accepted" ? "accent" : 
                          app.status === "Rejected" ? "gray" : "primary"
                        }
                        className="px-4 py-1"
                      >
                        {app.status}
                      </Badge>
                      <Link href={`/jobs/${app.jobId?._id}`}>
                        <Button variant="ghost" size="sm">View Job</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="py-12 text-center border-dashed" hoverEffect={false}>
              <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-inter">No applications yet</h3>
              <p className="text-gray-500 font-dmsans mt-1 mb-6">You haven't applied to any jobs yet.</p>
              <Link href="/jobs">
                <Button>Browse Jobs</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
