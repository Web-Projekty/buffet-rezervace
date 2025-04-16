import { useState, useEffect } from "react";
import HorizontalPaging from "../../ui/HorizontalPaging";
import { getTimeSlots, TimeSlotsApi } from "../../../utils/api";
import { Date as DateType, Hour, Minute } from "../../../types/types";
import Loading from "../../ui/Loading";
import FetchError from "../../error/FetchError";
import { useQuery } from "@tanstack/react-query";

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

  const {
    isPending: loading,
    error,
    data,
    refetch,
  } = useQuery<TimeSlotsApi>({
    queryKey: ["calendar"],
    queryFn: getTimeSlots,
  });

  useEffect(() => {
    if (data) {
      const formattedDate = data.timeslots.map((timeslot) => ({
        ...timeslot,
        date: new Date(timeslot.date).toLocaleDateString("cs-CZ", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      }));

      setDays(formattedDate);
      setSelectedDate(formattedDate[0]);
    }
  }, [data]);

  useEffect(() => {
    if (selectedDate && selectedHour && selectedMinute) {
      onTimeSelect(selectedDate, selectedHour, selectedMinute);
    }
  }, [selectedDate, selectedHour, selectedMinute, onTimeSelect]);

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

  return (
    <div
      className={`flex min-h-[25rem] flex-col gap-5 rounded-lg bg-backgroundColor p-6 shadow-md ${loading ? "justify-center" : ""}`}
    >
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
