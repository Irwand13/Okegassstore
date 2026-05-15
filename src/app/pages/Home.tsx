import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import GameCards from "../components/home/GameCards";
import ServicesCallout from "../components/home/ServicesCallout";
import EscrowBanner from "../components/home/EscrowBanner";
import FeaturedAccounts from "../components/home/FeaturedAccounts";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrustBar />
      <GameCards />
      <ServicesCallout />
      <EscrowBanner />
      <FeaturedAccounts />
      <Testimonials />
    </div>
  );
}
