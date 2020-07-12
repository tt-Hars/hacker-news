export interface IpageData {
    exhaustiveNbHits: boolean;
    hits: Array<IrowData>;
    hitsPerPage: number;
    nbHits: number;
    nbPages: number;
    page: number;
    params: string;
    processingTimeMS: number;
    query: string;
}

export interface IrowData {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  num_comments: number;
  story_id: string;
  story_title: string;
  story_url: string;
  parent_id: string;
  created_at_i: string;
  relevancy_score: number;
  _tags: [];
  objectID: number;
  _highlightResult: {
    title: { value: string; matchLevel: string; matchedWords: [] };
    url: { value: string; matchLevel: string; matchedWords: [] };
    author: { value: string; matchLevel: string; matchedWords: [] };
  };
}

export interface Igraph {
    x: Array<number>;
    y: Array<number>;
}
