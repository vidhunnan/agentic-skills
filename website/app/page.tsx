import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import ContextStack from "@/components/ContextStack";
import { DESIGN_STACK } from "@/components/lib/skills";
import Skills from "@/components/Skills";
import Proof from "@/components/Proof";
import Install from "@/components/Install";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <ContextStack />
        <ContextStack
          id="design"
          eyebrow="The design stack"
          title="Same idea, harder problem."
          tiers={DESIGN_STACK}
          intro={
            <>
              Code has <code>git log</code>
              . Every decision leaves a commit, a diff, a blame line — a bad
              record, but a recoverable one. A Figma file is a snapshot of the
              winner: it never holds the problem, the directions that were
              killed, or why the survivor won. That reasoning lives in comment
              threads and one person&rsquo;s memory, and within months
              it&rsquo;s gone from both.
            </>
          }
          rule={
            <>
              <strong>The tier with no equivalent:</strong>{" "}
              <code>docs/concepts/website/</code>{" "}
              — a durable record of the directions you killed, and why. No design
              tool stores it. It&rsquo;s the first thing anyone wants a year
              later, and the first thing that disappears.
            </>
          }
        />
        <Skills />
        <Proof />
        <Install />
      </main>
      <Footer />
    </>
  );
}
