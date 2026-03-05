import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <div className="grain">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 btn-rust"
            >
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <Hero />
                <About />
                <Resume />
                <Projects />
                <Services />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
