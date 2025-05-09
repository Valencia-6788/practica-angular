export interface Books {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: null;
  docs: Docs[];
}

export interface Docs {
  key?: string;
  title?: string;
  author_name?: string[];
  imgUrl?: string;
  description?: string;
  subjectPlaces?: string;
  subjectPeople?: string;
  subjectTime?: string;
  subjects?: string;
  firstPublishDate?: string;
  publisher?: string[];
  author?: string;
  first_publish_year?: number;
  cover_edition_key?: string;
  covers?: string[];
}

  
  export interface BookDetails {
    key: string;
    title: string;
    author_name?: string[];
    covers?: string[];
    subject_places?: string[];
    subject_people?: string[];
    subject_times?: string[];
    subjects?: string[];
    description?: { value: string };
    first_publish_year?: string;
    publisher?: string;
  }
  