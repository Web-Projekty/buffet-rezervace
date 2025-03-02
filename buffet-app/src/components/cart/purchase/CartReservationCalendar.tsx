import { useState, useEffect, useCallback } from "react";
import HorizontalPaging from "../../ui/HorizontalPaging";
import { getTimeSlots } from "../../utils/api";
import { Date as DateType, Hour, Minute } from "../../../types";
import Loading from "../../ui/Loading";
import FetchError from "../../error/FetchError";

type CartReservationCalendarProps = {
  onTimeSelect: (day: DateType, hour: Hour, minute: Minute) => void;
};

const CartReservationCalendar = ({
  onTimeSelect,
}: CartReservationCalendarProps) => {
  const [days, setDays] = useState<DateType[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [selectedHour, setSelectedHour] = useState<Hour | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<Minute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetchIndex, setRefetchIndex] = useState<number>(0);

  const fetchDates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { timeslots, error } = await getTimeSlots();

      if (error) {
        setError("Chyba při načítání kalendáře.");
      }

      const formattedDate = timeslots.map((timeslot) => ({
        ...timeslot,
        date: new Date(timeslot.date).toLocaleDateString("cs-CZ", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      }));

      setDays(formattedDate);
      setSelectedDate(formattedDate[0]);
    } catch {
      setError("Chyba při načítání kalendáře.");
    } finally {
      setLoading(false);
    }
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
    fetchDates();
  }, [fetchDates, refetchIndex]);

  useEffect(() => {
    if (selectedDate && selectedHour && selectedMinute) {
      onTimeSelect(selectedDate, selectedHour, selectedMinute);
    }
  }, [selectedDate, selectedHour, selectedMinute, onTimeSelect]);

  const renderDays = () => {
    return (
      <div className="w-full overflow-x-auto">
        <HorizontalPaging className="m-0 w-[25rem] p-0 md:w-[75rem] 2xl:w-[100rem]">
          {days?.map((day) => (
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
    );
  };

  const renderHours = () => {
    return (
      <div className="grid w-full grid-cols-2 gap-4">
        {selectedDate?.hours?.map((hour, index) => (
          <button
            key={hour.label + index}
            className={`min-w-[4rem] rounded py-2 text-center text-white disabled:text-white ${hour.available ? (selectedHour === hour ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
            onClick={() => hour.available && handleHourClick(hour)}
            disabled={!hour.available}
          >
            {hour.label}
          </button>
        ))}
      </div>
    );
  };

  const renderMinutes = () => {
    return (
      <div className="grid w-full grid-cols-2 gap-4">
        {selectedHour?.minutes?.map((minute, index) => {
          return (
            <button
              key={minute.label + index}
              className={`min-w-[4rem] text-nowrap rounded py-2 text-center text-white disabled:text-white ${minute.available ? (selectedMinute === minute ? "bg-green-500" : "bg-sky-400") : "bg-gray-600"}`}
              onClick={() => minute.available && handleMinuteClick(minute)}
              disabled={!minute.available}
            >
              {minute.label}
            </button>
          );
        })}
      </div>
    );
  };

  const refetch = () => {
    setRefetchIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex min-h-[25rem] flex-col justify-center gap-5 rounded-lg bg-backgroundColor p-6 shadow-md">
      {error && <FetchError refetch={refetch} />}
      {!loading ? (
        <>
          {renderDays()}
          <div className="flex flex-col items-start justify-center gap-10 md:gap-6 lg:flex-row">
            {renderHours()}
            {renderMinutes()}
          </div>
        </>
      ) : (
        <Loading size={45} />
      )}
    </div>
  );
};

export default CartReservationCalendar;
