import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";

const Credits = () => {
  const [coupon, setCoupon] = useState<string>("");

  const activate = () => {
    console.log("Activate");
  };

  const scan = () => {
    console.log("Scan");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Kredity</h1>
      <div className="flex flex-col gap-4 rounded-lg bg-backgroundColor px-4 py-2">
        <h2 className="text-xl">Přidání kupónem</h2>
        <div className="flex w-full flex-col gap-4">
          <Input
            id="coupon"
            type="text"
            label="Kód kupónu"
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
      <div className="flex min-h-[10rem] flex-col gap-4 rounded-lg bg-backgroundColor px-4 py-2">
        <h2 className="text-xl">Historie kreditů</h2>
        <div className="flex flex-col gap-4">
          <p className="text-white">Zatím žádná historie kreditů.</p>
        </div>
      </div>
    </div>
  );
};

export default Credits;
