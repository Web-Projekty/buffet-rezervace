import { motion } from "framer-motion";
import Input from "../Input";
import { Order } from "../../types";
import { scaleUpAnimation } from "../../animations";

type AdminOrderFilterProps = {
  ordersFilter: {
    name: string;
    date: string;
    status: Order["status"] | "all";
  };
  handleFilter: (e: React.ChangeEvent<any>) => void;
};

const AdminOrderFilter = ({
  ordersFilter,
  handleFilter,
}: AdminOrderFilterProps) => {
  return (
    <motion.div
      {...scaleUpAnimation}
      className="flex h-auto w-auto flex-col items-start justify-center gap-5 rounded-md bg-slate-900 p-10 md:w-[320px]"
    >
      <h2 className="text-2xl">Filtr</h2>
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="name">Jméno</label>
        <Input
          type="text"
          name="name"
          id="name"
          value={ordersFilter.name}
          onChange={handleFilter}
          placeholder="Zadejte jméno"
          className="rounded-md p-1 text-black placeholder-slate-400"
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="date">Datum</label>
        <Input
          type="date"
          name="date"
          id="date"
          value={ordersFilter.date}
          onChange={handleFilter}
          className="rounded-md p-1 text-black placeholder-slate-400"
        />
      </div>
      <div className="flex flex-row gap-2">
        <label htmlFor="status">Podle</label>
        <select
          name="status"
          id="status"
          className="rounded-md p-1 text-black"
          onChange={handleFilter}
        >
          <option value="all">Všechny</option>
          <option value="pickedup">Vyzvednuto</option>
          <option value="pending">Čeká na vyzvednutí</option>
          <option value="notpickedup">Nevyzvenduto</option>
        </select>
      </div>
    </motion.div>
  );
};

export default AdminOrderFilter;
