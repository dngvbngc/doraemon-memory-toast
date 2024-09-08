export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export type Course = {
  id: string;
  owner_id: string;
  name: string;
  last_updated_date: string;
};

export type Bread = {
  course_id: string;
  author_id: string;
  content: string;
  last_updated_date: string;
};