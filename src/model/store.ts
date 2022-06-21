
import jsonStore from 'data/store.json';
import { urlFormat } from 'helpers/url';

import { Store, Project, Img, Id } from './types';

const store: Store = jsonStore as Store;

export const projects: Project<Img>[] = store.projects.map((p) => populateImgs(p));

export function getProjectByUrl(
  urlName: string, 
  subProjectUrlName?: string
): Project<Img> | undefined {
  let project = projects.find(
    (p) => p.name && urlFormat(p.name) === urlName
  );
  if (subProjectUrlName && project) {
    project = (project.children as Project<any>[]).find(
      (p: any) => p.name && urlFormat(p.name) === subProjectUrlName
    ) ?? project; // If the sub project does not match, return the parent anyway
  }
  return project;
}

function populateImgs(project: Project<Id>): Project<Img> {
  return {
    ...project,
    children: project.children.map((child) => {
      return typeof child === 'number' 
        ? store.illustrations[child]
        : populateImgs(child)
    }) as Project<Img>[] | Img[]
  };
}
