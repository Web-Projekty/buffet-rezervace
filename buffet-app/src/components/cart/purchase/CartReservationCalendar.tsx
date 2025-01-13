import { useState, useEffect } from "react";
import HorizontalPaging from "../../ui/HorizontalPaging";
import { getTimeSlots } from "../../utils/api";
import { Date as DateType, Hour, Minute } from "../../../types";
import Loading from "../../ui/Loading";

type CartReservationCalendarProps = {
  onTimeSelect: (day: DateType, hour: Hour, minute: Minute) => void;
};

const CartReservationCalendar = ({
  onTimeSelect,
}: CartReservationCalendarProps) => {
  const [days, setDays] = useState<DateType[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateType | null>(days[0]);
  const [selectedHour, setSelectedHour] = useState<Hour | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<Minute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchDates = async () => {
      try {
        const { timeslots, error } = await getTimeSlots();

        if (error) {
          setError("Chyba při načítání časů.");
        }

        const formattedDate = timeslots.map((timeslot) => ({
          ...timeslot,
          date: new Date(timeslot.date).toLocaleDateString("cs-CZ", {
            weekday: "long",
            //year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));

        setDays(formattedDate);
        setSelectedDate(formattedDate[0]);
      } catch {
        setError("Chyba při načítání časů.");
      } finally {
        setLoading(false);
      }
    };
    fetchDates();
  }, []);

  const handleDateClick = (date: DateType) => {
    setSelectedMinute(null);
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-[25rem] flex-col gap-5 rounded-lg bg-backgroundColor p-6 shadow-md">
      {!loading ? (
        <>
          <div className="w-full overflow-x-auto">
            <HorizontalPaging className="m-0 w-[25rem] p-0 md:w-[75rem] 2xl:w-[100rem]">
              {days.map((day) => (
                <button
                  key={day.date}
                  className={`flex-shrink-0 rounded px-4 py-2 text-white ${day.available ? (selectedDate === day ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                  onClick={() => handleDateClick(day)}
                  disabled={!day.available}
                >
                  {day.date}
                </button>
              ))}
            </HorizontalPaging>
          </div>

          <div className="flex flex-col items-start justify-center gap-10 md:flex-row md:gap-6">
            <div className="grid w-full grid-cols-2 gap-4">
              {selectedDate?.hours?.map((hour) => (
                <button
                  key={hour.label}
                  className={`rounded px-4 py-2 text-white disabled:text-white ${hour.available ? (selectedHour === hour ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                  onClick={() => hour.available && handleHourClick(hour)}
                  disabled={!hour.available}
                >
                  {hour.label}
                </button>
              ))}
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
              {selectedHour?.minutes?.map((minute) => {
                return (
                  <button
                    key={minute.label}
                    className={`text-nowrap rounded px-4 py-2 text-center text-white disabled:text-white ${minute.available ? (selectedMinute === minute ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
                    onClick={() =>
                      minute.available && handleMinuteClick(minute)
                    }
                    disabled={!minute.available}
                  >
                    {minute.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <Loading size={30} />
      )}
    </div>
  );
};

export default CartReservationCalendar;
