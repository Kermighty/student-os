import { prisma } from "@/lib/prisma";

export const courseSelect = { id: true, courseCode: true, title: true, color: true } as const;
export const categorySelect = { id: true, name: true, color: true, createdAt: true } as const;

export async function searchWorkspace(userId: string, query: string) {
  const term = query.trim();
  if (!term) return { courses: [], assignments: [], notes: [], scheduleEvents: [], expenses: [] };

  const [courses, assignments, notes, scheduleEvents, expenses] = await Promise.all([
    prisma.course.findMany({ where: { userId, OR: [{ title: { contains: term, mode: "insensitive" } }, { courseCode: { contains: term, mode: "insensitive" } }, { instructor: { contains: term, mode: "insensitive" } }] }, select: courseSelect, take: 8 }),
    prisma.assignment.findMany({ where: { userId, OR: [{ title: { contains: term, mode: "insensitive" } }, { description: { contains: term, mode: "insensitive" } }] }, include: { course: { select: courseSelect } }, orderBy: { dueDate: "asc" }, take: 8 }),
    prisma.note.findMany({ where: { userId, OR: [{ title: { contains: term, mode: "insensitive" } }, { content: { contains: term, mode: "insensitive" } }] }, include: { course: { select: courseSelect } }, orderBy: { updatedAt: "desc" }, take: 8 }),
    prisma.scheduleEvent.findMany({ where: { userId, OR: [{ title: { contains: term, mode: "insensitive" } }, { location: { contains: term, mode: "insensitive" } }] }, include: { course: { select: courseSelect } }, orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }], take: 8 }),
    prisma.expense.findMany({ where: { userId, OR: [{ title: { contains: term, mode: "insensitive" } }, { notes: { contains: term, mode: "insensitive" } }, { paymentMethod: { contains: term, mode: "insensitive" } }] }, include: { category: { select: categorySelect } }, orderBy: { transactionDate: "desc" }, take: 8 }),
  ]);

  return { courses, assignments, notes, scheduleEvents, expenses };
}

export async function getAnalyticsData(userId: string, now = new Date()) {
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const weekStart = new Date(now);
  const day = weekStart.getDay() || 7;
  weekStart.setDate(weekStart.getDate() - day + 1);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const [assignments, courses, notesThisMonth, studySessions, weeklyAssignments, monthlyExpenses] = await Promise.all([
    prisma.assignment.findMany({ where: { userId }, select: { status: true, courseId: true, course: { select: { courseCode: true, title: true } } } }),
    prisma.course.findMany({ where: { userId }, select: { id: true, courseCode: true, title: true } }),
    prisma.note.count({ where: { userId, createdAt: { gte: monthStart, lt: nextMonthStart } } }),
    prisma.scheduleEvent.count({ where: { userId, eventType: "STUDY", dayOfWeek: { gte: 1, lte: 7 } } }),
    prisma.assignment.count({ where: { userId, updatedAt: { gte: weekStart, lt: weekEnd } } }),
    prisma.expense.findMany({ where: { userId, transactionDate: { gte: monthStart, lt: nextMonthStart } }, include: { category: true } }),
  ]);

  const completed = assignments.filter((assignment) => assignment.status === "COMPLETED").length;
  const courseDemand = new Map<string, { code: string; title: string; total: number; pending: number }>();
  for (const course of courses) courseDemand.set(course.id, { code: course.courseCode, title: course.title, total: 0, pending: 0 });
  for (const assignment of assignments) {
    const current = courseDemand.get(assignment.courseId);
    if (current) { current.total += 1; current.pending += assignment.status === "COMPLETED" ? 0 : 1; }
  }
  const mostDemandingCourse = [...courseDemand.values()].sort((left, right) => right.pending - left.pending || right.total - left.total)[0] ?? null;
  const income = monthlyExpenses.filter((expense) => expense.type === "INCOME").reduce((sum, expense) => sum + Number(expense.amount), 0);
  const spending = monthlyExpenses.filter((expense) => expense.type === "EXPENSE").reduce((sum, expense) => sum + Number(expense.amount), 0);
  const spendingByCategory = new Map<string, { name: string; total: number; color: string }>();
  for (const expense of monthlyExpenses.filter((item) => item.type === "EXPENSE")) {
    const current = spendingByCategory.get(expense.categoryId) ?? { name: expense.category.name, total: 0, color: expense.category.color };
    current.total += Number(expense.amount);
    spendingByCategory.set(expense.categoryId, current);
  }

  return { totalAssignments: assignments.length, completedAssignments: completed, pendingAssignments: assignments.length - completed, completionRate: assignments.length ? Math.round((completed / assignments.length) * 100) : 0, mostDemandingCourse, notesThisMonth, studySessions, weeklyAssignments, income, spending, savings: income - spending, topSpendingCategory: [...spendingByCategory.values()].sort((left, right) => right.total - left.total)[0] ?? null, spendingByCategory: [...spendingByCategory.values()].sort((left, right) => right.total - left.total) };
}

export async function exportUserData(userId: string) {
  const [user, courses, assignments, notes, scheduleEvents, categories, expenses] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, createdAt: true } }),
    prisma.course.findMany({ where: { userId } }),
    prisma.assignment.findMany({ where: { userId } }),
    prisma.note.findMany({ where: { userId } }),
    prisma.scheduleEvent.findMany({ where: { userId } }),
    prisma.expenseCategory.findMany({ where: { userId } }),
    prisma.expense.findMany({ where: { userId } }),
  ]);
  return { exportedAt: new Date().toISOString(), user, courses, assignments, notes, scheduleEvents, categories, expenses };
}