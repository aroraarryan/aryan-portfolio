import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Resume />
            <Projects />
            <Services />
            <Contact />
        </main>
    );
}
