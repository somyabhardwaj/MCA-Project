"use client";

import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface JobFiltersProps {
  onFilter: (filters: any) => void;
}

const JobFilters = ({ onFilter }: JobFiltersProps) => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter({ search, location, type, experience, category });
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setType("");
    setExperience("");
    setCategory("");
    onFilter({});
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6 sticky top-24">
      <div className="flex items-center space-x-2 pb-4 border-b border-gray-100">
        <Filter size={20} className="text-primary" />
        <h3 className="text-lg font-bold text-gray-900 font-inter">Filters</h3>
      </div>

      {/* Search */}
      <div className="space-y-4">
        <Input
          label="Search Jobs"
          placeholder="e.g. Frontend Developer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50"
        />
        <Input
          label="Location"
          placeholder="e.g. Remote, New York"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-gray-50"
        />
      </div>

      {/* Job Type */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 font-inter">Job Type</label>
        <div className="space-y-2">
          {["Remote", "Hybrid", "On-site"].map((t) => (
            <label key={t} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={(e) => setType(e.target.value)}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 font-inter">Experience Level</label>
        <div className="space-y-2">
          {["Entry", "Mid", "Senior"].map((exp) => (
            <label key={exp} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="experience"
                value={exp}
                checked={experience === exp}
                onChange={(e) => setExperience(e.target.value)}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{exp}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
        <Button onClick={handleFilter} className="w-full">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default JobFilters;
