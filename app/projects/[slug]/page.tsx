import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/data';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectOverview } from '@/components/project/ProjectOverview';
import { Residences } from '@/components/project/Residences';
import { Amenities } from '@/components/project/Amenities';
import { Gallery } from '@/components/project/Gallery';
import { Specifications } from '@/components/project/Specifications';
import { LocationSection } from '@/components/project/LocationSection';
import { ProjectEnquiry } from '@/components/project/ProjectEnquiry';
import { MoreProjects } from '@/components/project/MoreProjects';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.name} — ${project.category}. ${project.summary}`,
    openGraph: { title: project.name, description: project.summary, images: [project.heroImage] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <Residences project={project} />
      <Amenities project={project} />
      <Gallery project={project} />
      <Specifications project={project} />
      <LocationSection project={project} />
      <ProjectEnquiry project={project} />
      <MoreProjects current={project.slug} />
    </>
  );
}
