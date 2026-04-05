import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Briefcase, Building, Search, Users, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-inter">
                Find your dream job <span className="text-primary">faster than ever.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 font-dmsans">
                Browse through thousands of high-paying jobs from top companies. 
                Whether you're looking for Remote, Hybrid, or On-site roles, we've got you covered.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href="/jobs">
                  <Button size="lg" className="shadow-lg shadow-primary/20">
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/auth/employer/signup">
                  <Button variant="outline" size="lg">
                    Post a Job
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500 font-dmsans">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  ))}
                </div>
                <span>Trusted by <span className="font-bold text-gray-900">50,000+</span> professionals</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-10" />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="space-y-6">
                  {[
                    { title: "Software Engineer", company: "TechCorp", location: "Remote", salary: "$120k - $160k" },
                    { title: "Product Designer", company: "DesignHub", location: "New York", salary: "$90k - $130k" },
                    { title: "Data Analyst", company: "DataFlow", location: "Hybrid", salary: "$100k - $140k" },
                  ].map((job, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-accent">{job.salary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { label: "Active Jobs", value: "12,000+", icon: Briefcase },
              { label: "Top Companies", value: "2,500+", icon: Building },
              { label: "Daily Applications", value: "8,000+", icon: Search },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <stat.icon size={24} />
                </div>
                <dt className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</dt>
                <dd className="mt-2 text-base font-medium text-gray-500 font-dmsans">{stat.label}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold leading-7 text-primary font-inter uppercase tracking-wide">
            How it works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-inter">
            Everything you need to land your next job
          </p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Search & Filter", desc: "Easily find jobs based on your preferences with our advanced filters." },
              { title: "One-Click Apply", desc: "Apply to your favorite jobs with just one click using your saved profile." },
              { title: "Real-time Updates", desc: "Get notified immediately when your application status changes." },
              { title: "Company Profiles", desc: "Learn more about companies before you apply to their roles." },
              { title: "Secure & Private", desc: "Your data is always safe with us. We value your privacy above all." },
              { title: "Expert Support", desc: "Our team is here to help you at every step of your career journey." },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <CheckCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-inter">{feature.title}</h3>
                <p className="mt-2 text-left text-sm text-gray-500 font-dmsans leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-inter">
            Ready to start your next career move?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80 font-dmsans">
            Join thousands of professionals who have found their dream jobs through JobPortal.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth/employee/signup">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50">
                Join as Candidate
              </Button>
            </Link>
            <Link href="/auth/employer/signup" className="text-sm font-semibold leading-6 text-white hover:text-white/90">
              Register as Employer <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
