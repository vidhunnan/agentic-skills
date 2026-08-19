import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Matrix from "@/components/Matrix";
import Loop from "@/components/Loop";
import Skills from "@/components/Skills";
import Install from "@/components/Install";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Matrix />
        <Loop />
        <Skills />
        <Install />
      </main>
      <Footer />
    </>
  );
}
