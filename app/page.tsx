import { Hero } from "@/components/sections/hero";
import { About, Services, Skills } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Education, Testimonials } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { ProjectCard } from "@/components/project-card";
import { Stagger, StaggerItem, Reveal } from "@/components/motion";
import { Section } from "@/components/ui";
import { sortedProjects, toCard } from "@/lib/projects";
import { profile } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function Home() {
  const featured = sortedProjects.filter((p) => p.featured).map(toCard);
  const more = sortedProjects.filter((p) => !p.featured).map(toCard);

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: profile.title,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    sameAs: [profile.linkedin, profile.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />

      <Section
        id="projects"
        eyebrow="projects"
        title="Selected work."
        intro="Products I've built or shipped — from enterprise AI to mobile apps and company websites."
      >
        <Stagger className="grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} large />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mb-6 mt-16">
          <h3 className="text-balance-tight text-2xl font-semibold">More projects</h3>
        </Reveal>
        <Reveal>
          <ProjectsGrid projects={more} />
        </Reveal>
      </Section>

      <Testimonials />
      <Education />
      <Contact />
    </>
  );
}
