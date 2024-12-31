import { useState, useEffect } from "react";
import HorizontalPaging from "../ui/HorizontalPaging";

export type Day = {
  hours: Hour[];
  available: boolean;
  label: string;
};

export type Hour = {
  minutes: Minute[];
  available: boolean;
  label: string;
};

export type Minute = {
  available: boolean;
  label: string;
};

type CartReservationCalendarProps = {
  onTimeSelect: (day: Day, hour: Hour, minute: Minute) => void;
};

const Hours: Hour[] = [
  {
    label: "10:00",
    available: false,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "11:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "12:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: false,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "13:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "14:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "15:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "16:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "17:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "18:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "19:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "20:00",
    available: true,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
  {
    label: "21:00",
    available: false,
    minutes: [
      {
        label: ":00 - :05",
        available: true,
      },
      {
        label: ":10 - :15",
        available: true,
      },
      {
        label: ":20 - :25",
        available: true,
      },
      {
        label: ":30 - :35",
        available: true,
      },
    ],
  },
];

const CartReservationCalendar = ({
  onTimeSelect,
}: CartReservationCalendarProps) => {
  const [days, setDays] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<Day | null>(days[0]);
  const [selectedHour, setSelectedHour] = useState<Hour | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<Minute | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      const today = new Date();
      const data: Day[] = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
          hours: Hours,
          available: !Hours.every((hour) => !hour.available),
          label: date.toLocaleDateString("cs-CZ", {
            weekday: "long",
            day: "numeric",
            month: "numeric",
          }),
        };
      });
      setDays(data);
      setSelectedDate(data[0]);
    };
    fetchDates();
  }, []);

  const handleDateClick = (date: Day) => {
    setSelectedHour(null);
    setSelectedDate(date);
  };

  const handleHourClick = (hour: Hour) => {
    setSelectedMinute(null);
    setSelectedHour(hour);
  };

  const handleMinuteClick = (minute: Minute) => {
    setSelectedMinute(minute);
  };

  useEffect(() => {
    if (selectedDate && selectedHour && selectedMinute) {
      onTimeSelect(selectedDate, selectedHour, selectedMinute);
    }
  }, [selectedDate, selectedHour, selectedMinute, onTimeSelect]);

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-slate-700 p-6 font-sans">
      <h2 className="text-2xl font-bold">Čas vyzvednutí</h2>
      <div className="flex flex-col gap-4 rounded-lg bg-backgroundColor p-6 shadow-md">
        {/* Day */}
        <div className="w-full overflow-x-auto">
          <HorizontalPaging className="m-0 p-0">
            {days.map((day) => (
              <button
                key={day.label}
                className={`flex-shrink-0 rounded px-4 py-1 text-white ${day.available ? (selectedDate === day ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                onClick={() => handleDateClick(day)}
                disabled={!day.available}
              >
                {day.label}
              </button>
            ))}
          </HorizontalPaging>
        </div>

        {/* Hours */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="grid w-full grid-cols-2 gap-4">
            {selectedDate?.hours?.map((hour) => (
              <button
                key={hour.label}
                className={`flex-shrink-0 rounded px-4 py-2 text-white disabled:text-white ${hour.available ? (selectedHour === hour ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                onClick={() => hour.available && handleHourClick(hour)}
                disabled={!hour.available}
              >
                {hour.label}
              </button>
            ))}
          </div>

          {/* Minutes */}
          <div className="grid w-full grid-cols-2 gap-4">
            {selectedHour?.minutes?.map((minute) => {
              return (
                <button
                  key={minute.label}
                  className={`text-nowrap rounded px-4 py-2 text-white disabled:text-white ${minute.available ? (selectedMinute === minute ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                  onClick={() => minute.available && handleMinuteClick(minute)}
                  disabled={!minute.available}
                >
                  {minute.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartReservationCalendar;
