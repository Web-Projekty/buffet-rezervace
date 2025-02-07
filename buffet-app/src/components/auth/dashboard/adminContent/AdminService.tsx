import { useCallback, useState } from "react";
import Button from "../../../ui/Button";

type CloseTimeDay = {
  label: string;
  availableDay: boolean;
  open: string;
  close: string;
};

type TimeSlots = {
  interval: number;
  maxOrdersPerInterval: number;
  minDays: number;
  maxDays: number;
};

const AdminService = () => {
  const [closeTimeForDays, setCloseTimeForDays] = useState<CloseTimeDay[]>([
    {
      label: "Pondělí",
      availableDay: true,
      open: "",
      close: "",
    },
    {
      label: "Úterý",
      availableDay: true,
      open: "",
      close: "",
    },
    {
      label: "Středa",
      availableDay: true,
      open: "",
      close: "",
    },
    {
      label: "Čtvrtek",
      availableDay: true,
      open: "",
      close: "",
    },
    {
      label: "Pátek",
      availableDay: true,
      open: "",
      close: "",
    },
    {
      label: "Sobota",
      availableDay: false,
      open: "",
      close: "",
    },
    {
      label: "Neděle",
      availableDay: false,
      open: "",
      close: "",
    },
  ]);

  const [timeSlots, setTimeSlots] = useState<TimeSlots>({
    interval: 0,
    maxOrdersPerInterval: 0,
    minDays: 0,
    maxDays: 0,
  });

  const handleAvailableDayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const day = e.target.name;
      const newCloseTimeForDays = closeTimeForDays.map((d) => {
        if (d.label === day) {
          return { ...d, availableDay: !d.availableDay };
        }
        return d;
      });

      setCloseTimeForDays(newCloseTimeForDays);
    },
    [closeTimeForDays],
  );

  const handleTimeChange = useCallback(
    (day: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const newCloseTimeForDays = closeTimeForDays.map((d) => {
        if (d.label === day) {
          return { ...d, [e.target.id]: e.target.value };
        }
        return d;
      });

      setCloseTimeForDays(newCloseTimeForDays);
    },
    [closeTimeForDays],
  );

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeSlots({ ...timeSlots, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex w-full flex-col justify-between gap-5">
      <h1 className="text-2xl font-bold">Nastavení provozu</h1>
      <div className="flex w-full flex-col justify-center gap-2 rounded-lg bg-backgroundColor p-2">
        <h2 className="text-xl font-bold">Otevírací doba</h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          {closeTimeForDays.map((day) => (
            <div key={day.label} className="flex flex-col items-center">
              <div className="flex flex-row gap-2">
                <label htmlFor="closed">{day.label}</label>
                <input
                  type="checkbox"
                  id="closed"
                  name={day.label}
                  checked={day.availableDay}
                  onChange={handleAvailableDayChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="time"
                  id="open"
                  className="w-20 rounded-lg p-1 text-black"
                  value={day.open}
                  onChange={(e) => handleTimeChange(day.label, e)}
                />
                -
                <input
                  type="time"
                  id="close"
                  className="w-20 rounded-lg p-1 text-black"
                  value={day.close}
                  onChange={(e) => handleTimeChange(day.label, e)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <Button className="w-1/5">Uložit změny</Button>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-2 rounded-lg bg-backgroundColor p-2">
        <h2 className="text-xl font-bold">Časové sloty</h2>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col justify-evenly gap-5 md:flex-row md:gap-0">
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="interval">Interval</label>
              <span className="flex flex-row items-center gap-2">
                <input
                  type="number"
                  id="interval"
                  className="w-20 rounded-lg p-1 text-black"
                  name="interval"
                  value={timeSlots.interval}
                  onChange={handleTimeSlotChange}
                />{" "}
                min
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="maxOrdersPerInterval">
                Max. počet objednávek
              </label>
              <span className="flex flex-row items-center gap-2">
                <input
                  type="number"
                  id="maxOrdersPerInterval"
                  className="w-20 rounded-lg p-1 text-black"
                  name="maxOrdersPerInterval"
                  value={timeSlots.maxOrdersPerInterval}
                  onChange={handleTimeSlotChange}
                />{" "}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-row items-center gap-2">
            <div className="flex w-1/3 flex-col gap-3">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="minDays">
                  Min. počet dnů, na který si lze objednat předem
                </label>
                <input
                  type="number"
                  id="minDays"
                  className="w-20 rounded-lg p-1 text-black"
                  name="minDays"
                  value={timeSlots.minDays}
                  onChange={handleTimeSlotChange}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="maxDays">Max. počet objednávek</label>
                <input
                  type="number"
                  id="maxDays"
                  className="w-20 rounded-lg p-1 text-black"
                  name="maxDays"
                  value={timeSlots.maxDays}
                  onChange={handleTimeSlotChange}
                />
              </div>
            </div>
            <div className="flex w-2/3 flex-col gap-3 text-xs">
              <p>
                Minimální počet dnů, na který lze objednat předem (např. je-li
                zadáno č. 1, a je-li před časem objednání zásob, lze si
                objednávku zarezervovat nejdříve na začátek otevírací doby
                dalšího pracovního dne), je-li zadáno č. 0, lze si objednat na
                další volný časový slot (není doporučeno)
              </p>
              <p>
                Maximální počet dnů, na který lze objednat předem (např. je-li
                zadáno č. 1, lze si zarezervovat objednávku nejpozději na konec
                otevírací doby dalšího pracovního dne), je-li zadáno č. 0, lze
                objednat na 365 dní dopředu (není doporučeno)
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button className="w-1/5">Uložit změny</Button>
        </div>
      </div>
    </section>
  );
};

export default AdminService;
