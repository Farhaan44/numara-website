import ProjectTemplate from "@/components/ProjectTemplate";

const data = {
  title: "Batul House",
  subtitle: "An exclusive gated community offering finest accessibility and connectivity to all parts of Mumbai.",
  heroImage: "/batulhousewide.jpg",
  overview: {
    heading: "Serenity in the City",
    description: "Batul House is designed to be an oasis of calm within the bustling city.\n\nIt features spacious layouts, premium finishes, and a dedication to crafting an enduring environment for generations to come.",
    image: "/batulhousetall.jpg",
    stats: [
      { label: "Status", value: "Completed" },
      { label: "Type", value: "Residential" },
      { label: "Location", value: "Mazgaon" },
    ]
  }
};

export default function BatulHousePage() {
  return <ProjectTemplate data={data} />;
}