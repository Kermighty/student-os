import { ScheduleBlock } from "@/features/dashboard/components/schedule-block";
import type { ScheduleEventRecord } from "@/features/schedule/schedule-types";

export function ScheduleTimeline({ items }: { items: ScheduleEventRecord[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ScheduleBlock key={item.id} item={item} />
      ))}
    </div>
  );
}
