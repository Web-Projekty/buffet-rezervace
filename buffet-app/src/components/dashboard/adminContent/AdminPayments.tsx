import { useState } from "react";
import Button from "../../ui/Button";

type PaymentForm = {
  thePay: boolean;
  thePayApi: string;
  thePayPass: string;
  credits: boolean;
  cash: boolean;
};

const AdminPayments = () => {
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    thePay: false,
    thePayApi: "",
    thePayPass: "",
    credits: false,
    cash: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="flex w-full flex-col justify-between gap-5">
      <h1 className="text-2xl font-bold">Nastavení provozu</h1>
      <div className="flex w-full flex-col justify-center gap-2 rounded-lg bg-backgroundColor p-2">
        <h2 className="text-xl font-bold">Platební brána ThePay</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" name="thePay" id="thePay" />
            <label htmlFor="thePay">Povolit platbu přes bránu ThePay</label>
          </div>

          <div className="flex w-full flex-row items-center gap-2">
            <label htmlFor="thePayApi" className="w-1/4">
              API Klíč
            </label>
            <input
              type="text"
              id="thePayApi"
              name="thePayApi"
              className="w-3/4 rounded-lg p-1 text-black"
              placeholder="API Klíč"
              value={paymentForm.thePayApi}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full flex-row items-center gap-2">
            <label htmlFor="thePayPass" className="w-1/4">
              API Heslo
            </label>
            <input
              type="password"
              id="thePayPass"
              name="thePayPass"
              className="w-3/4 rounded-lg p-1 text-black"
              placeholder="API Heslo"
              value={paymentForm.thePayPass}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button className="w-1/5">Uložit změny</Button>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-2 rounded-lg bg-backgroundColor p-2">
        <h2 className="text-xl font-bold">Kreditový systém</h2>
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            name="credits"
            id="credits"
            checked={paymentForm.credits}
            onChange={handleChange}
          />
          <label htmlFor="credits">Povolit kreditový systém</label>
        </div>
        <div className="flex w-full justify-end">
          <Button className="w-1/5">Uložit změny</Button>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-2 rounded-lg bg-backgroundColor p-2">
        <h2 className="text-2xl font-bold">Platba na pokladně</h2>
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            name="cash"
            id="cash"
            checked={paymentForm.cash}
            onChange={handleChange}
          />
          <label htmlFor="cash">Povolit platbu na pokladně</label>
        </div>
        <div className="flex w-full justify-end">
          <Button className="w-1/5">Uložit změny</Button>
        </div>
      </div>
    </section>
  );
};

export default AdminPayments;
