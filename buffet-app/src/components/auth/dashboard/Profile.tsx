import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export type ProfileFormDataType = {
  name: string;
  email: string;
  tel: string;
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

const Profile = () => {
  const {
    fullName,
    email,
    tel,
    handleSavePassword: savePassword,
    handleSaveInfo: saveInfo,
    loading,
  } = useUser();
  const canEditProfile = true;
  const [formData, setFormData] = useState({
    name: fullName || "",
    email: email || "",
    tel: tel || "",
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    saveInfo(formData);
  };

  const handleSavePassword = () => {
    savePassword(formData);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Nastavení profilu</h1>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col justify-between gap-3 rounded-lg bg-backgroundColor p-2">
          <h2 className="text-xl font-bold">Kontaktní údaje</h2>
          <div className="flex w-full flex-col gap-2">
            <Input
              id="name"
              name="name"
              type="text"
              label="Jméno"
              placeholder="Jméno"
              className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
              inputClassName={`rounded-lg p-1 text-black ${canEditProfile ? "" : "bg-gray-500"}`}
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
              inputClassName={`rounded-lg p-1 text-black ${canEditProfile ? "" : "bg-gray-500"}`}
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              id="tel"
              name="tel"
              type="tel"
              label="Telefon"
              placeholder="Telefon"
              className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
              inputClassName="rounded-lg p-1 text-black"
              value={formData.tel}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={handleSaveInfo} loading={loading}>
            Uložit změny
          </Button>
        </div>
        <div className="flex w-full flex-col justify-between gap-3 rounded-lg bg-backgroundColor p-2">
          <h2 className="text-xl font-bold">Změna hesla</h2>
          <div className="flex w-full flex-wrap gap-2">
            <Input
              id="password"
              name="password"
              label="Staré heslo"
              type="password"
              placeholder="Heslo"
              className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
              inputClassName="rounded-lg p-1 text-black"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Input
              id="new-password"
              name="newPassword"
              label="Nové heslo"
              type="password"
              placeholder="Nové heslo"
              className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
              inputClassName="rounded-lg p-1 text-black"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <Input
              id="new-password-confirmation"
              name="newPasswordConfirmation"
              label="Potvrzení hesla"
              type="password"
              placeholder="Potvrzení nového hesla"
              className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
              inputClassName="rounded-lg p-1 text-black"
              value={formData.newPasswordConfirmation}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={handleSavePassword} loading={loading}>
            Uložit změny
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
