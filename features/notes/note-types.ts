export type NoteCourse = {
  id: string;
  courseCode: string;
  title: string;
  color: string;
};

export type NoteRecord = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  courseId: string | null;
  createdAt: string;
  updatedAt: string;
  course: NoteCourse | null;
};