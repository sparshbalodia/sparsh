import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectSection";
import AboutSection from "../components/AboutSection";

export default function Home({preloaderDone}) {
  return <>
    <Hero preloaderDone={preloaderDone} />
    <ProjectsSection/>
    <AboutSection/>
    </>
  ;
}