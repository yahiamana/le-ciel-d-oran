import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import ReservationForm from "./components/ReservationForm";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MenuSection />
      <ReservationForm />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
