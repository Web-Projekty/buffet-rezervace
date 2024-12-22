import React, { useState, useEffect } from "react";

type DateOption = {
  date: string;
  label: string;
};

type TimeSlot = {
  time: string;
  available: boolean;
  minutes: {
    time: string;
    available: boolean;
  }[];
};

type SelectedTimeSlot = {
  date: string;
  time: string;
};

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<SelectedTimeSlot | null>(
    null,
  );
  const [dates, setDates] = useState<DateOption[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      const data: DateOption[] = [
        { date: "2023-12-16", label: "Pondělí 16. 12." },
        { date: "2023-12-17", label: "Úterý 17. 12." },
        { date: "2023-12-18", label: "Středa 18. 12." },
      ];
      setDates(data);
      setSelectedDate(data[0]?.date || "");
    };

    // Dummy data for time slots
    const fetchTimeSlots = async () => {
      const data: TimeSlot[] = [
        {
          time: "2:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "3:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "4:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "5:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "6:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "7:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "9:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "10:00",
          available: false,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "11:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "13:00",
          available: false,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "15:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "17:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "19:00",
          available: false,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "20:00",
          available: true,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "21:00",
          available: false,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
        {
          time: "22:00",
          available: false,
          minutes: [
            { time: ":00 - :05", available: true },
            { time: ":05 - :10", available: true },
            { time: ":10 - :15", available: false },
            { time: ":15 - :20", available: true },
            { time: ":20 - :25", available: true },
            { time: ":25 - :30", available: true },
            { time: ":30 - :35", available: true },
            { time: ":35 - :40", available: true },
            { time: ":40 - :45", available: true },
            { time: ":45 - :50", available: true },
            { time: ":50 - :55", available: true },
            { time: ":55 - :60", available: true },
          ],
        },
      ];
      setTimeSlots(data);
    };

    fetchDates();
    fetchTimeSlots();
  }, []);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleTimeSlotClick = (time: TimeSlot) => {
    setSelectedSlot(time ? { date: selectedDate, time: time.time } : null);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-slate-700 p-6 font-sans">
      <h2 className="text-2xl font-bold">Čas vyzvednutí</h2>
      <div className="rounded-lg bg-backgroundColor p-6 shadow-md">
        {/* Date Tabs */}
        <div className="mb-6 flex flex-row gap-4">
          {dates.map((d) => (
            <button
              key={d.date}
              className={`rounded px-4 py-1 text-white ${selectedDate === d.date ? "bg-green-500" : "bg-sky-400"}`}
              onClick={() => handleDateClick(d.date)}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="grid w-full grid-cols-2 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                className={`rounded px-4 py-2 text-white disabled:text-white ${slot.available ? (selectedSlot?.time === slot.time ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                onClick={() => slot.available && handleTimeSlotClick(slot)}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            {/* {selectedSlot &&
              selectedSlot.minutes.map((minutes) => {
                return (
                  <button
                    key={minutes.time}
                    className={`rounded px-4 py-2 disabled:text-white ${minutes.available ? "bg-sky-400 text-white" : "bg-gray-600"}`}
                    onClick={() =>
                      minutes.available && handleTimeSlotClick(selectedSlot)
                    }
                    disabled={!minutes.available}
                  >
                    {minutes.time}
                  </button>
                );
              })} */}
          </div>
        </div>
      </div>
      <p>
        Selected slot: {selectedSlot?.time}, {}
      </p>
    </div>
  );
};

export default App;
