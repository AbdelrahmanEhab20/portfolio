import { LogoMark } from "./logo";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/content/projects";

// Year is fixed at build time (cached), which is fine for a static site.
async function buildYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await buildYear();
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2.5">
          <LogoMark size={24} />
          <span>
            © {year} {profile.shortName}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fg">
            <GithubIcon size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-fg">
            <LinkedinIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
