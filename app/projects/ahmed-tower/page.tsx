import ProjectTemplate from "@/components/ProjectTemplate";

const data = {
  title: "Ahmed Tower",
  subtitle: "Crafting a legacy of precision and exclusivity in the heart of Mumbai.",
  heroImage: "/ahmedtowerwide2.jpg",
  overview: {
    heading: "Enduring Beauty & Purpose",
    description: "Ahmed Tower was built with a clear vision: where architecture meets community and design meets life.\n\nEvery space is intentionally crafted to provide maximum utility without ever compromising on our signature aesthetic.",
    image: "/ahmedtowertall.jpg",
    stats: [
      { label: "Status", value: "Completed" },
      { label: "Type", value: "Residential" },
      { label: "Location", value: "Mumbai" },
    ]
  }
};

export default function AhmedTowerPage() {
  return <ProjectTemplate data={data} />;
}