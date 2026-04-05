"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle, ChevronLeft, Plus, X } from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Remote",
    experience: "Entry",
    category: "",
    description: "",
    requirements: [""],
    benefits: [""],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, type: "requirements" | "benefits") => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [type]: newArray }));
  };

  const addArrayItem = (type: "requirements" | "benefits") => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeArrayItem = (index: number, type: "requirements" | "benefits") => {
    const newArray = formData[type].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [type]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.filter(r => r.trim() !== ""),
          benefits: formData.benefits.filter(b => b.trim() !== ""),
        }),
      });

      if (res.ok) {
        router.push("/employer/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Post job error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft size={18} />
        <span>Back to dashboard</span>
      </button>

      <div className="flex items-center space-x-4 mb-10">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Briefcase size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-inter">Post a New Job</h1>
          <p className="text-gray-500 font-dmsans">Fill in the details to find your next great hire</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 font-inter pb-4 border-b border-gray-100">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Job Title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
            />
            <Input
              label="Company Name"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Inc"
            />
            <Input
              label="Location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York"
            />
            <Input
              label="Salary Range"
              name="salary"
              required
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $100k - $140k"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 font-inter">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 font-inter">Experience Level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
              >
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <Input
              label="Category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Engineering"
            />
          </div>
        </Card>

        <Card className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 font-inter pb-4 border-b border-gray-100">Job Details</h2>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 font-inter">Description</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="flex w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-dmsans leading-relaxed"
              placeholder="Provide a detailed description of the role and responsibilities..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 font-inter">Requirements</label>
              <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("requirements")}>
                <Plus size={16} className="mr-1" /> Add Requirement
              </Button>
            </div>
            {formData.requirements.map((req, idx) => (
              <div key={idx} className="flex space-x-2">
                <Input
                  value={req}
                  onChange={(e) => handleArrayChange(idx, e.target.value, "requirements")}
                  placeholder={`Requirement ${idx + 1}`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="px-2"
                  onClick={() => removeArrayItem(idx, "requirements")}
                  disabled={formData.requirements.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 font-inter">Benefits</label>
              <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("benefits")}>
                <Plus size={16} className="mr-1" /> Add Benefit
              </Button>
            </div>
            {formData.benefits.map((benefit, idx) => (
              <div key={idx} className="flex space-x-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleArrayChange(idx, e.target.value, "benefits")}
                  placeholder={`Benefit ${idx + 1}`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="px-2"
                  onClick={() => removeArrayItem(idx, "benefits")}
                  disabled={formData.benefits.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" size="lg" className="px-10 shadow-lg shadow-primary/20" loading={loading}>
            Post Job
          </Button>
        </div>
      </form>
    </div>
  );
}
