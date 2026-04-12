import ProjectTemplate from "@/components/ProjectTemplate";

const data = {
  title: "Sea Senate",
  subtitle: "A landmark mixed-use development redefining the city skyline.",
  heroImage: "/seasenatewide2.jpg",
  overview: {
    heading: "Bold Architecture, Premium Spaces",
    description: "Sea Senate combines high-end commercial spaces with ultra-luxury residential units.\n\nOffering sweeping views of the Arabian Sea and unmatched connectivity, it represents the pinnacle of modern multi-use developments.",
    image: "/IMG_1657.png",
    stats: [
      { label: "Status", value: "Ongoing" },
      { label: "Type", value: "Mixed-Use" },
      { label: "Location", value: "Agripada" },
    ]
  }
};

export default function SeaSenatePage() {
  return <ProjectTemplate data={data} />;
}