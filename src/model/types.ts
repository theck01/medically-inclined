
export interface Store {
  readonly projects: Project<Id>[];
  readonly illustrations: { [id: Id]: Img };
}

export interface Project<T> {
  readonly id: Id;
  readonly name: string;
  readonly coverImg: { 
    fixed: { fileName: string, altText: string },
    gif: { fileName: string, altText: string }
  };
  readonly children: Project<T>[] | Array<T>;
}

export interface Img {
  readonly id: Id;
  readonly name: string;
  readonly altText: string;
  readonly fileName: { small: string, full: string };
}

export type Id = number;
