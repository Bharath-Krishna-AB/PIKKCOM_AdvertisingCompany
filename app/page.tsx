import Hero from "@/components/Hero";
import HomeSolution from "@/components/HomeSolution";
import Message from "@/components/Message";
import Footer from "@/components/Footer";
import SmootherWrapper from "@/components/SmootherWrapper";
import GridSection from "@/components/ui/GridSection";
import hatImage from "@/public/images/hat.png";
import intelligenceImage from "@/public/images/intelligence.jpeg";
import selectionImage from "@/public/images/selection.jpeg";
import mediaImage from "@/public/images/media.jpeg";
import optimizationImage from "@/public/images/optimization.jpeg";
import CircularDemo from "@/components/CircularDemo/CircularDemo";
import HomeConnect from "@/components/HomeConnect";

const SERVICES_DATA = [
  {
    id: "01",
    label: "Solutions",
    title: "Intelligence",
    image: intelligenceImage,
    link: "#",
    color: "#ffb400"
  },
  {
    id: "02",
    label: "Solutions",
    title: "Selection",
    image: selectionImage,
    link: "#",
    color: "#a0a0ff"
  },
  {
    id: "03",
    label: "Solutions",
    title: "Media",
    image: mediaImage,
    link: "#",
    color: "#b0e0b0"
  },
  {
    id: "04",
    label: "Solutions",
    title: "Optimization",
    image: optimizationImage,
    link: "#",
    color: "#ff8080"
  }
];

export default function Home() {
  return (
    <SmootherWrapper>
      <GridSection>
        <Hero />
      </GridSection>
      <GridSection>
        <Message />
      </GridSection>
      <GridSection>
        <HomeSolution services={SERVICES_DATA} />
      </GridSection>
      <GridSection>
        <CircularDemo />
      </GridSection>
      <GridSection>
        <HomeConnect />
      </GridSection>
      <Footer />
    </SmootherWrapper>
  );
}
