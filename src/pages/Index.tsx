import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OfferingsSection from "@/components/OfferingsSection";
import AgentNetworkSection from "@/components/AgentNetworkSection";
import WhyOpenMoneySection from "@/components/WhyOpenMoneySection";
import BuildersSection from "@/components/BuildersSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <OfferingsSection />
      <AgentNetworkSection />
      <WhyOpenMoneySection />
      <BuildersSection />
      <ComingSoonSection />
      <PartnersSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
