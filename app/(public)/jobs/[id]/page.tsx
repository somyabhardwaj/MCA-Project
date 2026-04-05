"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MapPin, DollarSign, Briefcase, Clock, CheckCircle, ChevronLeft, Building } from "lucide-react";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data.job);
        }
      } catch (error) {
        console.error("Fetch job error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      router.push("/auth/employee/login");
      return;
    }

    if (user.role !== "EMPLOYEE") {
      alert("Only employees can apply for jobs");
      return;
    }

    setApplying(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: id }),
      });

      if (res.ok) {
        setApplied(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to apply");
      }
    } catch (error) {
      console.error("Apply job error:", error);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 flex justify-center items-center h-screen">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 font-inter">Job Not Found</h1>
        <Button variant="outline" className="mt-6" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header / Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4"
          >
            <ChevronLeft size={18} />
            <span>Back to search</span>
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                <Building size={40} />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-gray-900 font-inter leading-tight">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-dmsans">
                  <span className="font-semibold text-primary">{job.company}</span>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>Full-time</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              {applied ? (
                <Button size="lg" className="w-full md:w-auto bg-green-500 hover:bg-green-600 pointer-events-none">
                  <CheckCircle size={20} className="mr-2" />
                  Applied
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full md:w-auto shadow-lg shadow-primary/20"
                  onClick={handleApply}
                  loading={applying}
                  disabled={applying || !!(user && user.role === "EMPLOYER")}
                >
                  Apply for this job
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 font-inter mb-6">Job Description</h2>
              <div className="prose prose-blue max-w-none text-gray-600 font-dmsans leading-relaxed space-y-4">
                {job.description.split("\n").map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 font-inter mb-6">Requirements</h2>
              <ul className="space-y-4">
                {job.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-3 text-gray-600 font-dmsans">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} />
                    </div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 font-inter mb-6">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50 text-gray-700 font-medium font-dmsans flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="p-8 space-y-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 font-inter pb-4 border-b border-gray-100">Job Overview</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Salary</p>
                    <p className="text-sm font-bold text-gray-900">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Job Type</p>
                    <Badge variant="accent">{job.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold text-gray-900">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Posted on</p>
                    <p className="text-sm font-bold text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              {!applied && (
                <Button className="w-full mt-6" onClick={handleApply} loading={applying}>
                  Apply Now
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
