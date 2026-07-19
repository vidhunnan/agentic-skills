import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ContextStack from "@/components/ContextStack";
import Skills from "@/components/Skills";
import Proof from "@/components/Proof";
import Install from "@/components/Install";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ContextStack />
        <Skills />
        <Proof />
        <Install />
      </main>
      <Footer />
    </>
  );
}
