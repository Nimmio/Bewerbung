import Applications from "@/components/applications";
import { Application } from "@/lib/types";

const data: Application[] = [
  {
    id: "1",
    position: "Frontend Developer",
    company: "TechCorp",
    date: "2023-05-15",
    status: "pending",
    email: "john.doe@example.com",
    notes: "Applied through company website. Has 3 years of React experience.",
  },
  {
    id: "2",
    position: "UX Designer",
    company: "DesignHub",
    date: "2023-05-10",
    status: "reviewed",
    email: "jane.smith@example.com",
    notes: "Portfolio looks promising. Schedule interview next week.",
  },
  {
    id: "3",
    position: "Product Manager",
    company: "InnovateTech",
    date: "2023-05-05",
    status: "accepted",
    email: "mike.johnson@example.com",
    notes: "Great fit for the team. Offer sent.",
  },
  {
    id: "4",
    position: "Backend Developer",
    company: "ServerSolutions",
    date: "2023-05-01",
    status: "rejected",
    email: "sarah.williams@example.com",
    notes: "Not enough experience with our tech stack.",
  },
];

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Job Application Manager</h1>
      <Applications data={data} />
    </>
  );
}
