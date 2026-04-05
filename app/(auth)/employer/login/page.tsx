"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Building, ArrowRight } from "lucide-react";

export default function EmployerLoginPage() {
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "EMPLOYER" }),
      });

      if (res.ok) {
        router.push("/employer/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
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
            Employer Portal
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-dmsans">
            Login as an <span className="font-bold text-accent">Employer</span> to find top talent
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-dmsans">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-accent hover:text-accent/80 font-dmsans">
                Forgot password?
              </a>
            </div>
          </div>

          <Button type="submit" variant="secondary" className="w-full" size="lg" loading={loading}>
            Sign In to Dashboard
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500 font-dmsans">
            New here?{" "}
            <Link href="/auth/employer/signup" className="font-bold text-accent hover:text-accent/80">
              Create Employer Account
            </Link>
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100 text-center">
          <Link
            href="/auth/employee/login"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors font-dmsans"
          >
            Switch to Employee Login
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
