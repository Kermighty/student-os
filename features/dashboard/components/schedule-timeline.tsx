import { ScheduleBlock } from "@/features/dashboard/components/schedule-block";
import type { ScheduleBlockItem } from "@/features/dashboard/data";

export function ScheduleTimeline({ items }: { items: ScheduleBlockItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ScheduleBlock key={item.id} item={item} />
      ))}
    </div>
  );
}
