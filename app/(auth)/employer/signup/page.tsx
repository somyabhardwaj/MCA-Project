"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Building, ArrowRight } from "lucide-react";

export default function EmployerSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "EMPLOYER" }),
      });

      if (res.ok) {
        router.push("/employer/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
            <Building size={28} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 font-inter">
            Employer Signup
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-dmsans">
            Start hiring the best talent for your company
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-500 border border-red-100">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <Input
              label="Company / HR Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Inc"
            />
            <Input
              label="Work Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@company.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" variant="secondary" className="w-full" size="lg" loading={loading}>
            Create Employer Account
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500 font-dmsans">
            Already registered?{" "}
            <Link href="/auth/employer/login" className="font-bold text-accent hover:text-accent/80">
              Sign in
            </Link>
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100 text-center">
          <Link
            href="/auth/employee/signup"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors font-dmsans"
          >
            Switch to Employee Signup
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
