import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { CREDITS_ENABLED } from "../../../constants";

const Credits = () => {
  const [coupon, setCoupon] = useState<string>("");

  const activate = () => {
    console.log("Activate");
  };

  const scan = () => {
    console.log("Scan");
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Kredity</h1>
      <div className="relative flex flex-col gap-4 rounded-lg bg-backgroundColor px-4 py-2">
        <div
          className={
            CREDITS_ENABLED
              ? "hidden"
              : "absolute left-0 top-0 flex h-[10rem] w-full items-center justify-center rounded-lg bg-backgroundColor bg-opacity-50"
          }
        ></div>
        <h2 className="text-xl">Přidání kupónem</h2>
        <div className="flex w-full flex-col gap-4">
          <Input
            id="coupon"
            type="text"
            label="Kód kupónu"
            placeholder="Zadejte kód kupónu"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            inputClassName="w-[12rem] rounded-lg p-1 text-black"
            className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
          />
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <Button onClick={scan}>Naskenovat</Button>
            <Button onClick={activate}>Aktivovat</Button>
          </div>
        </div>
      </div>
      <div className="relative flex min-h-[10rem] flex-col gap-4 rounded-lg bg-backgroundColor px-4 py-2">
        <div
          className={
            CREDITS_ENABLED
              ? "hidden"
              : "absolute left-0 top-0 flex h-[10rem] w-full items-center justify-center rounded-lg bg-backgroundColor bg-opacity-50"
          }
        ></div>
        <h2 className="text-xl">Historie kreditů</h2>
        <div className="flex flex-col gap-4">
          <p className="text-white">Zatím žádná historie kreditů.</p>
        </div>
      </div>
    </section>
  );
};

export default Credits;
