import Hero from "@/components/Hero";
import HomeSolution from "@/components/HomeSolution";
import Message from "@/components/Message";
import Footer from "@/components/Footer";
import SmootherWrapper from "@/components/SmootherWrapper";
import GridSection from "@/components/ui/GridSection";
import hatImage from "@/public/images/hat.png";
import CircularDemo from "@/components/CircularDemo/CircularDemo";
import HomeConnect from "@/components/HomeConnect";

const SERVICES_DATA = [
  {
    id: "01",
    label: "Solutions",
    title: "Intelligence",
    image: hatImage,
    link: "#",
    color: "#ffb400"
  },
  {
    id: "02",
    label: "Solutions",
    title: "Selection",
    image: hatImage,
    link: "#",
    color: "#a0a0ff"
  },
  {
    id: "03",
    label: "Solutions",
    title: "Media",
    image: hatImage,
    link: "#",
    color: "#b0e0b0"
  },
  {
    id: "04",
    label: "Solutions",
    title: "Optimization",
    image: hatImage,
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
