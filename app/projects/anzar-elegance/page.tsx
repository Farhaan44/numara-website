import ProjectTemplate from "@/components/ProjectTemplate";

const data = {
  title: "Anzar Elegance",
  subtitle: "21-floors of thoughtfully designed apartments offering sea-view and where every detail speaks of refinement and comfort.",
  heroImage: "/anzarelegancewide2.jpg",
  overview: {
    heading: "Redefining Urban Luxury",
    description: "Anzar Elegance stands as a testament to modern architecture blended with timeless comfort.\n\nFeaturing sweeping city views, meticulous craftsmanship, and state-of-the-art amenities, it is designed for those who seek the extraordinary in Agripada.",
    image: "/IMG_1653.PNG",
    stats: [
      { label: "Status", value: "Ongoing" },
      { label: "Type", value: "Residential" },
      { label: "Location", value: "Agripada" },
    ]
  }
};

export default function AnzarElegancePage() {
  return <ProjectTemplate data={data} />;
}