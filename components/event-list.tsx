import { Button } from "@/components/ui/button";
import { Event } from "@/app/calendar/page";

type EventListProps = {
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
};

export default function EventList({
  events,
  onEditEvent,
  onDeleteEvent,
}: EventListProps) {
  if (events.length === 0) {
    return <p>No events scheduled for this date.</p>;
  }

  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex items-center justify-between p-4 bg-secondary rounded-lg"
        >
          <div>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditEvent(event)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeleteEvent(event.id)}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
