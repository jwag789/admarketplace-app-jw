export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Comment = {
  id: number;
  postId: number;
  email: string;
  name: string;
  body: string;
}