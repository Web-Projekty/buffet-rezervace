import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations/animations";
import { useUser } from "../../hooks/useUser";

const AccountInformation = () => {
  const { fullName, email, classTitle, credits } = useUser();

  return (
    <motion.section
      {...scaleUpAnimation(0.5)}
      className="flex h-[8rem] flex-col justify-between gap-1 rounded-lg bg-slate-900 p-2"
    >
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          {fullName}{" "}
          {classTitle ? (
            <span className="text-base font-normal">{classTitle}</span>
          ) : null}
        </h2>
        <p>{email}</p>
      </div>

      <p className="flex justify-between rounded-lg bg-backgroundColor p-1 px-2">
        Předplacené kredity
        <span>{credits ? credits : "Chyba v načítání kreditů"}</span>
      </p>
    </motion.section>
  );
};

export default AccountInformation;
