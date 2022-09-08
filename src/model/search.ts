import { publicUrlForImg, urlFormat } from 'helpers/url';

import { projects } from './store';
import { Project, Img } from './types';

const TITLE_SEARCH_WEIGHT = 7;
const ALT_TEXT_SEARCH_WEIGHT = 2;
const MISC_SEARCH_WEIGHT = 1;

export interface SearchResult {
  readonly url: string;
  readonly imgUrl: string;
  readonly imgAltText: string;
  readonly title: string;
  readonly resourceType: 'project' | 'img';
  readonly resource: Project<Img> | Img;
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

function scoreProject(
  p: Project<Img>, 
  terms: string[], 
  parentUrl = '/projects'
): ScoredResult[] {
  const childScores = p.childType === 'project' ? (
    (p.children as Project<Img>[]).reduce((scoredProjects, childProject) => {
      return scoredProjects.concat(
        scoreProject(childProject, terms, `${parentUrl}/${urlFormat(p.name)}`)
      );
    }, [] as ScoredResult[])
  ) : (
    (p.children as Img[]).reduce((scoredImgs, img) => {
      const imgRelevance = calculateImgRelevance(img, terms);
      return imgRelevance > 0 
        ? scoredImgs.concat([{
            result: { 
              url: `${parentUrl}/${urlFormat(p.name)}?show=${urlFormat(img.name)}`,
              imgUrl: publicUrlForImg(img.fileName.small), 
              imgAltText: `Preview image for "${img.name}"`,
              title: img.name, 
              resourceType: 'img', 
              resource: img
            },
            relevance: imgRelevance
          }])
        : scoredImgs;
    }, [] as ScoredResult[])
  );

  const relevance = calculateProjectRelevance(p, terms);
  return relevance > 0 
    ? childScores.concat([{
        result: { 
          url: `${parentUrl}/${urlFormat(p.name)}`,
          imgUrl: publicUrlForImg(p.coverImg.fixed.fileName), 
          imgAltText: p.coverImg.fixed.altText,
          title: p.name, 
          resourceType: 'project', 
          resource: p 
        },
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
  const individualMatchCounts = terms.map(
    t => (str.match(new RegExp(t , 'gui')) || []).length
  );
  const lowestCount = individualMatchCounts.reduce(
    (lowestMatchCount, count) => Math.min(lowestMatchCount, count), Infinity);
  return lowestCount === Infinity ? 0 : lowestCount;
}
