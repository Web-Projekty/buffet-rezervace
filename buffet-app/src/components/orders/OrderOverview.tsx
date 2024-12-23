import OrderTracking from "./OrderTracking";

const Buttons = [
  { id: 1, name: "Přehled" },
  { id: 2, name: "Historie" },
];

const OrderOverview = () => {
  return (
    <div className="m-auto grid h-[40rem] w-[75rem] grid-cols-3 gap-2">
      <div className="col-span-1 flex flex-col gap-2 rounded-lg bg-slate-900 p-2 text-white">
        {Buttons.map(({ id, name }) => (
          <button
            key={id}
            className="rounded-lg border-2 border-white p-2 text-white"
          >
            {name}
          </button>
        ))}
      </div>
      <div className="col-span-2 flex flex-col gap-2 rounded-lg bg-slate-900 p-2 text-white">
        <OrderTracking />
      </div>
    </div>
  );
};

export default OrderOverview;
