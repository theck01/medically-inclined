
export interface Store {
  readonly projects: Project<ImgId>[];
  readonly illustrations: { [id: ImgId]: Img };
}

export interface Project<T> {
  readonly name: string;
  readonly coverImg: { 
    fixed: { fileName: string, altText: string },
    gif: { fileName: string, altText: string }
  };
  readonly children: Project<T>[] | Array<T>;
}

export interface Img {
  readonly id: ImgId;
  readonly name: string;
  readonly altText: string;
  readonly fileName: string;
}

export type ImgId = string;
