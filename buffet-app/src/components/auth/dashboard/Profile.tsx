import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const Profile = () => {
  const { fullName, email } = useUser();
  const canEditProfile = true;

  const [name, setName] = useState<string>(fullName ? fullName : "");
  const [mail, setMail] = useState<string>(email ? email : "");
  const [tel, setTel] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Nastavení profilu</h1>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-between gap-3 rounded-lg bg-backgroundColor p-2">
          <h2 className="text-xl">Kontaktní údaje</h2>
          <div className="flex flex-col gap-1">
            <Input
              id="name"
              type="text"
              label="Jméno"
              placeholder="Jméno"
              className={`rounded-lg p-1 text-black ${canEditProfile ? "" : "bg-gray-500"}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              className={`rounded-lg p-1 text-black ${canEditProfile ? "" : "bg-gray-500"}`}
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <Input
              id="phone"
              type="tel"
              label="Telefon"
              placeholder="Telefon"
              className="rounded-lg p-1 text-black"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
          <Button>Uložit změny</Button>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-lg bg-backgroundColor p-2">
          <h2 className="text-xl">Změna hesla</h2>
          <div className="flex flex-wrap gap-2">
            <Input
              id="password"
              label="Staré heslo"
              type="password"
              placeholder="Heslo"
              className="rounded-lg p-1 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              id="new-password"
              label="Nové heslo"
              type="password"
              placeholder="Nové heslo"
              className="rounded-lg p-1 text-black"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              id="new-password-confirmation"
              label="Potvrzení hesla"
              type="password"
              placeholder="Potvrzení nového hesla"
              className="rounded-lg p-1 text-black"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            />
          </div>
          <Button>Uložit změny</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
