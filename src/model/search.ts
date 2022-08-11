
import { projects } from './store';
import { Project, Img } from './types';

const TITLE_SEARCH_WEIGHT = 7;
const ALT_TEXT_SEARCH_WEIGHT = 2;
const MISC_SEARCH_WEIGHT = 1;

export interface SearchResult {
  readonly resourceType: 'project' | 'img';
  readonly resource: Project<Img> | Img;
  readonly reason: string;
}

export function search(rawTerms: string): SearchResult[] {
  const terms = rawTerms.split(/\W+/);
  const scoredResults = projects.reduce(
    (scores, p) => scores.concat(scoreProject(p, terms)), 
    [] as ScoredResult[]
  );
  const sortedResults = scoredResults.sort((a, b) => {
    return a.relevance > b.relevance ? -1 : (a.relevance < b.relevance ? 1 : 0);
  });
  return sortedResults.map(r => r.result);
}

interface ScoredResult {
  readonly result: SearchResult;
  readonly relevance: number;
}

function scoreProject(p: Project<Img>, terms: string[]): ScoredResult[] {
  const childScores = p.childType === 'project' ? (
    (p.children as Project<Img>[]).reduce((scoredProjects, childProject) => {
      return scoredProjects.concat(scoreProject(childProject, terms))
    }, [] as ScoredResult[])
  ) : (
    (p.children as Img[]).reduce((scoredImgs, img) => {
      const imgRelevance = calculateImgRelevance(img, terms);
      return imgRelevance > 0 
        ? scoredImgs.concat([{
            result: { resourceType: 'img', resource: img, reason: 'because' },
            relevance: imgRelevance
          }])
        : scoredImgs;
    }, [] as ScoredResult[])
  );

  const relevance = calculateProjectRelevance(p, terms);
  return relevance > 0 
    ? childScores.concat([{
        result: { resourceType: 'project', resource: p, reason: 'because' },
        relevance: relevance
      }])
    : childScores;
}

function calculateProjectRelevance(p: Project<Img>, terms: string[]): number {
  return TITLE_SEARCH_WEIGHT * countMatches(p.name, terms) +
    MISC_SEARCH_WEIGHT * countMatches(p.coverImg.fixed.altText, terms);
}

function calculateImgRelevance(i: Img, terms: string[]): number {
  return TITLE_SEARCH_WEIGHT * countMatches(i.name, terms) +
  ALT_TEXT_SEARCH_WEIGHT * countMatches(i.altText, terms)
}


function countMatches(str: string, terms: string[]): number {
  return terms.reduce(
    (count, term) => count + (str.match(new RegExp(term , 'g')) || []).length,
    0
  );
}
