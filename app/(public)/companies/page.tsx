import { Building, Globe, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const companies = [
  { name: "TechCorp", location: "San Francisco, CA", employees: "1,000 - 5,000", industry: "Technology", jobs: 12 },
  { name: "DesignHub", location: "New York, NY", employees: "100 - 500", industry: "Design", jobs: 5 },
  { name: "DataFlow", location: "Remote", employees: "500 - 1,000", industry: "Analytics", jobs: 8 },
  { name: "CloudScale", location: "Austin, TX", employees: "5,000+", industry: "Cloud Computing", jobs: 15 },
  { name: "InnoLabs", location: "London, UK", employees: "50 - 100", industry: "Innovation", jobs: 3 },
  { name: "BioGen", location: "Boston, MA", employees: "1,000 - 2,000", industry: "Biotech", jobs: 6 },
];

export default function CompaniesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 font-inter">Top Companies</h1>
        <p className="text-gray-500 font-dmsans mt-2 max-w-2xl mx-auto">
          Explore top companies around the world and find the perfect culture for your next career move.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company, idx) => (
          <Card key={idx} className="p-8 group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/10">
                <Building size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-inter">{company.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Globe size={14} className="mr-1" />
                  {company.industry}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2 text-gray-400" />
                {company.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users size={16} className="mr-2 text-gray-400" />
                {company.employees} employees
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-bold text-primary">{company.jobs} Active Jobs</span>
              <Button variant="outline" size="sm">View Company</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
