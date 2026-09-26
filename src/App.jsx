import { ThemeProvider } from "./context/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import EducationCerts from "./components/EducationCerts.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import NetworkBackground from "./components/NetworkBackground.jsx";

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-noise overflow-x-hidden">
        {/* Background for the entire portfolio */}
        <NetworkBackground className="fixed inset-0 w-full h-full -z-10 opacity-70 pointer-events-none" />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          {/* <EducationCerts /> */}
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;