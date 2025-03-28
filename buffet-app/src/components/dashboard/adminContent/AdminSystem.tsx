import { useState } from "react";
import Button from "../../ui/Button";
import LDAPSettings, { LDAPForm } from "./systemSettings/LDAPSettings";
import EmailServerSettings, {
  EmailServerForm,
} from "./systemSettings/EmailServerSettings";

type SystemOption = "ldap" | "mysql";

const AdminSystem = () => {
  const [ldapForm, setLdapForm] = useState<LDAPForm>({
    host: "",
    port: "",
    username: "",
    password: "",
  });

  const [emailServerForm, setEmailServerForm] = useState<EmailServerForm>({
    emailCipher: "none",
    host: "",
    port: "",
    username: "",
    password: "",
    senderAddress: "",
    senderDomain: "",
    senderName: "",
  });

  const [selectedOption, setSelectedOption] = useState<SystemOption>("ldap");

  const handleOptionChange = (option: SystemOption) => {
    setSelectedOption(option);
  };

  const handleLDAPInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLdapForm({ ...ldapForm, [e.target.name]: e.target.value });
  };

  const handleEmailServerInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEmailServerForm({ ...emailServerForm, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Systémové nastavení</h1>
      <div className="flex w-full flex-col justify-between gap-5">
        <div className="flex w-full flex-col items-start gap-2 rounded-lg bg-backgroundColor p-2">
          <h2 className="text-xl font-bold">Úložiště uživatelských databází</h2>
          <div className="flex w-full flex-row items-start gap-2">
            <input
              type="radio"
              id="ldap"
              name="system-option"
              value="ldap"
              checked={selectedOption === "ldap"}
              onChange={() => handleOptionChange("ldap")}
              className="mt-2"
            />
            <div className="flex w-full flex-col">
              <label htmlFor="ldap" className="text-lg font-bold">
                LDAP
              </label>
              {selectedOption === "ldap" && (
                <LDAPSettings
                  formData={ldapForm}
                  onChange={handleLDAPInputChange}
                />
              )}
            </div>
          </div>
          <div className="flex w-full flex-row items-start gap-2">
            <input
              type="radio"
              id="mysql"
              name="system-option"
              value="mysql"
              checked={selectedOption === "mysql"}
              onChange={() => handleOptionChange("mysql")}
              className="mt-2"
            />
            <label htmlFor="mysql" className="text-lg font-bold">
              MySQL
            </label>
          </div>
          <div className="flex w-full justify-end">
            <Button className="w-1/5">Uložit změny</Button>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-2 rounded-lg bg-backgroundColor p-2">
          <h2 className="text-xl font-bold">E-mailový server</h2>
          <EmailServerSettings
            formData={emailServerForm}
            onChange={handleEmailServerInputChange}
          />
          <div className="flex w-full justify-end">
            <Button className="w-1/5">Uložit změny</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSystem;
