import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const CalendarHeader = () => {
    return (
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>
          Previous
        </button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>
          Next
        </button>
      </div>
    );
  };

  const CalendarDay = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    let day = startDate;
    while (day <= endDate) {
      days.push(
        <div
          key={day.toISOString()}
          className={`p-2 ${isSameMonth(day, currentMonth) ? "" : "text-gray-400"}`}
        >
          {format(day, "d")}
        </div>,
      );
      day = addDays(day, 1);
    }
    return (
      <div className="grid grid-cols-7 items-center justify-center gap-2">
        {days}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <CalendarHeader />
      <CalendarDay />
    </div>
  );
};

export default Calendar;
