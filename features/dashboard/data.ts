export type ScheduleBlockItem = {
  id: string;
  start: string;
  end: string;
  course: string;
  room: string;
  instructor: string;
  color: string;
};

export type NoteItem = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  pinned: boolean;
  course: string;
  accent: string;
};

export const statCards = [
  {
    label: "Active Courses",
    value: "6",
    description: "Across 2 departments",
    trend: "+1 from last week",
    icon: "BookOpen",
    tone: "blue",
  },
  {
    label: "Pending Assignments",
    value: "11",
    description: "3 due this week",
    trend: "2 critical",
    icon: "ClipboardList",
    tone: "amber",
  },
  {
    label: "Classes This Week",
    value: "18",
    description: "92% attendance",
    trend: "+3 compared to last week",
    icon: "CalendarDays",
    tone: "emerald",
  },
  {
    label: "Monthly Expenses",
    value: "$482",
    description: "Budget on track",
    trend: "-$28 vs target",
    icon: "Wallet",
    tone: "violet",
  },
] as const;

export const schedule: ScheduleBlockItem[] = [
  {
    id: "s1",
    start: "09:00",
    end: "10:15",
    course: "Data Structures",
    room: "Room 204",
    instructor: "Dr. Alvarez",
    color: "bg-blue-500",
  },
  {
    id: "s2",
    start: "11:00",
    end: "12:15",
    course: "Statistics",
    room: "Room 118",
    instructor: "Prof. Lin",
    color: "bg-violet-500",
  },
  {
    id: "s3",
    start: "14:00",
    end: "15:30",
    course: "Design Studio",
    room: "Studio B",
    instructor: "A. Moreno",
    color: "bg-emerald-500",
  },
  {
    id: "s4",
    start: "17:30",
    end: "18:45",
    course: "Study Group",
    room: "Library North",
    instructor: "Peer Circle",
    color: "bg-amber-500",
  },
];

export const notes: NoteItem[] = [
  {
    id: "n1",
    title: "Algorithms revision map",
    preview: "Break down sorting complexity and map the patterns that show up in weekly quizzes.",
    updatedAt: "2h ago",
    pinned: true,
    course: "CS 301",
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
  },
  {
    id: "n2",
    title: "Lab experiment questions",
    preview: "Double-check the variable control list and color-code the observations before Friday.",
    updatedAt: "Yesterday",
    pinned: false,
    course: "BIO 110",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  {
    id: "n3",
    title: "Essay outline draft",
    preview: "Lead with a clear thesis, then anchor each paragraph to the historical evidence list.",
    updatedAt: "2 days ago",
    pinned: true,
    course: "ENG 210",
    accent: "from-violet-500/20 via-violet-500/5 to-transparent",
  },
  {
    id: "n4",
    title: "Study plan checklist",
    preview: "Complete the calculus drill set before the scheduled review session and gather flashcards.",
    updatedAt: "3 days ago",
    pinned: false,
    course: "MTH 220",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
];

export const calendarDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export const calendarDates = [
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10, active: true },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
];
