"use client";

import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { eventTypeLabels, formatTime, getDayLabel, timeToMinutes } from "@/features/schedule/schedule-schema";
import { eventColorClasses, type ScheduleCourse, type ScheduleEventRecord } from "@/features/schedule/schedule-types";

const days = [1, 2, 3, 4, 5, 6, 7];
const dayShortLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const gridStart = 6 * 60;
const gridEnd = 22 * 60;
const timeLabels = Array.from({ length: 17 }, (_, index) => 6 + index);

function getMonday(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setDate(copy.getDate() - day + 1);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function weekLabel() {
  const start = getMonday(new Date());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(start) + " – " + new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(end);
}

function EventBlock({ event }: { event: ScheduleEventRecord }) {
  const top = Math.max(0, ((timeToMinutes(event.startTime) - gridStart) / (gridEnd - gridStart)) * 100);
  const height = Math.max(4.5, ((timeToMinutes(event.endTime) - timeToMinutes(event.startTime)) / (gridEnd - gridStart)) * 100);
  const color = eventColorClasses[event.color as keyof typeof eventColorClasses] ?? eventColorClasses.blue;
  return <Link href={`/schedule/${event.id}`} className={`absolute left-1 right-1 overflow-hidden rounded-xl border px-2 py-2 text-left shadow-sm transition hover:z-10 hover:-translate-y-0.5 hover:shadow-lg ${color}`} style={{ top: `${top}%`, height: `${height}%`, minHeight: "3rem" }}><p className="truncate text-[10px] font-semibold uppercase tracking-[0.08em] opacity-85">{event.course?.courseCode ?? eventTypeLabels[event.eventType]}</p><p className="mt-1 truncate text-xs font-semibold">{event.title}</p><p className="mt-1 truncate text-[10px] opacity-90">{formatTime(event.startTime)} – {formatTime(event.endTime)}</p></Link>;
}

function MobileEventCard({ event }: { event: ScheduleEventRecord }) {
  const color = eventColorClasses[event.color as keyof typeof eventColorClasses] ?? eventColorClasses.blue;
  return <Link href={`/schedule/${event.id}`} className="flex min-h-28 items-stretch gap-3 rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"><div className={`w-1.5 shrink-0 rounded-full ${color.split(" ")[0]}`} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{formatTime(event.startTime)} – {formatTime(event.endTime)}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{eventTypeLabels[event.eventType]}</span></div><h3 className="mt-3 truncate text-base font-semibold text-slate-900 dark:text-white">{event.title}</h3><div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400"><span>{event.course?.courseCode ?? "Personal"}</span>{event.location ? <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span> : null}</div></div></Link>;
}

export function ScheduleCalendar({ initialEvents, courses }: { initialEvents: ScheduleEventRecord[]; courses: ScheduleCourse[] }) {
  const [courseId, setCourseId] = useState("all");
  const [eventType, setEventType] = useState("all");
  const today = new Date().getDay() || 7;
  const [selectedDay, setSelectedDay] = useState(today);
  const events = useMemo(() => initialEvents.filter((event) => (courseId === "all" || event.courseId === courseId) && (eventType === "all" || event.eventType === eventType)), [courseId, eventType, initialEvents]);
  const selectedEvents = events.filter((event) => event.dayOfWeek === selectedDay).sort((left, right) => left.startTime.localeCompare(right.startTime));

  return <div className="space-y-6"><div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Schedule</h1><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">{events.length} events</span></div><p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><CalendarDays className="h-4 w-4" />{weekLabel()}</p></div><Link href="/schedule/new"><Button><Plus className="h-4 w-4" />New event</Button></Link></div>
    <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:flex-row"><label className="flex-1"><span className="sr-only">Filter by course</span><select value={courseId} onChange={(event) => setCourseId(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="all">All courses</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.courseCode}</option>)}</select></label><label className="flex-1"><span className="sr-only">Filter by event type</span><select value={eventType} onChange={(event) => setEventType(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="all">All event types</option>{Object.entries(eventTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
    <div className="md:hidden"><div className="flex gap-2 overflow-x-auto pb-2">{days.map((day, index) => <button key={day} type="button" onClick={() => setSelectedDay(day)} className={`min-w-16 rounded-2xl px-3 py-2 text-center text-xs font-semibold transition ${selectedDay === day ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"}`} aria-pressed={selectedDay === day}><span className="block">{dayShortLabels[index]}</span>{day === today ? <span className="mt-1 block text-[10px] opacity-80">Today</span> : null}</button>)}</div><div className="mt-3 space-y-3">{selectedEvents.length ? selectedEvents.map((event) => <MobileEventCard key={event.id} event={event} />) : <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40"><Clock3 className="mx-auto h-6 w-6 text-slate-400" /><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Nothing scheduled for {getDayLabel(selectedDay)}.</p></div>}</div></div>
    <div className="hidden overflow-x-auto rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 md:block"><div className="min-w-[980px]"><div className="grid grid-cols-[72px_repeat(7,minmax(120px,1fr))] border-b border-slate-200 dark:border-slate-800"><div /><div className="contents">{days.map((day, index) => <div key={day} className={`border-l border-slate-200 px-3 py-4 text-center dark:border-slate-800 ${day === today ? "bg-blue-50/60 dark:bg-blue-500/5" : ""}`}><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{dayShortLabels[index]}</p>{day === today ? <span className="mt-1 inline-block text-[10px] font-semibold text-blue-600 dark:text-blue-300">Today</span> : null}</div>)}</div></div><div className="grid grid-cols-[72px_repeat(7,minmax(120px,1fr))]"><div className="relative h-[960px]">{timeLabels.map((hour, index) => <span key={hour} className="absolute right-2 text-[10px] text-slate-400" style={{ top: `${(index / 16) * 100}%`, transform: "translateY(-50%)" }}>{hour > 12 ? hour - 12 : hour}{hour >= 12 ? " PM" : " AM"}</span>)}</div>{days.map((day) => <div key={day} className={`relative h-[960px] border-l border-slate-200 bg-[linear-gradient(to_bottom,transparent_59px,rgba(148,163,184,0.14)_60px)] bg-[length:100%_60px] dark:border-slate-800 dark:bg-[linear-gradient(to_bottom,transparent_59px,rgba(148,163,184,0.10)_60px)] ${day === today ? "bg-blue-50/30 dark:bg-blue-500/[0.03]" : ""}`}>{events.filter((event) => event.dayOfWeek === day).map((event) => <EventBlock key={event.id} event={event} />)}</div>)}</div></div></div>
  </div>;
}