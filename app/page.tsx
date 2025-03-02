import { Container } from "@/components/global/container";
import { Header } from "@/components/global/header";
import { HeroSection } from "@/components/sections/hero";
import { Spotlight } from "@/components/ui/spotlight";
import { WorkSection } from "@/components/sections/work";
import { TestimoniesSection } from "@/components/sections/testimonies";
import { ServiceSection } from "@/components/sections/service";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import { AboutSection } from "@/components/sections/about";
import { FooterSection } from "@/components/sections/footer";
import { WorkflowSection } from "@/components/sections/workflow";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative overflow-clip">
        <Spotlight />
        <Container>
          <Header />
          <HeroSection />
          <WorkSection />
          <TestimoniesSection />
          <AboutSection />
          <WorkflowSection />
          <ServiceSection />
          <FooterSection />
        </Container>
      </main>
    </SmoothScrollProvider>
  );
}
