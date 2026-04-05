import Link from "next/link";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { MapPin, DollarSign, Briefcase, Clock } from "lucide-react";

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    experience: string;
    createdAt: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <Link href={`/jobs/${job._id}`}>
      <Card className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-inter">{job.title}</h3>
            <p className="text-sm font-medium text-primary">{job.company}</p>
          </div>
          <Badge variant={job.type === "Remote" ? "accent" : "primary"}>{job.type}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-500 space-x-1.5">
            <MapPin size={16} className="text-gray-400" />
            <span className="font-dmsans">{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-1.5">
            <DollarSign size={16} className="text-gray-400" />
            <span className="font-dmsans">{job.salary}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-1.5">
            <Briefcase size={16} className="text-gray-400" />
            <span className="font-dmsans">{job.experience}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-1.5">
            <Clock size={16} className="text-gray-400" />
            <span className="font-dmsans">{timeAgo(job.createdAt)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <span className="text-sm font-semibold text-primary hover:underline">View Details →</span>
        </div>
      </Card>
    </Link>
  );
};

export default JobCard;
