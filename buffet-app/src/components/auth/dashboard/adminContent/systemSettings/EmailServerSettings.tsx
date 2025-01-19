import Input from "../../../../ui/Input";

export type EmailServerForm = {
  emailCipher: "none" | "ssl" | "tls";
  host: string;
  port: string;
  username: string;
  password: string;
  senderAddress: string;
  senderDomain: string;
  senderName: string;
};

const EmailServerSettings = ({
  formData,
  onChange,
}: {
  formData: EmailServerForm;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) => (
  <div className="flex w-full flex-col gap-2">
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="email-cipher" className="w-1/4">
        Šifrování
      </label>
      <select
        id="email-cipher"
        name="emailCipher"
        className="w-3/4 rounded-lg p-1 text-black"
        onChange={onChange}
        value={formData.emailCipher}
      >
        <option value="none">Bez šifrování</option>
        <option value="ssl">SSL</option>
        <option value="tls">TLS</option>
      </select>
    </div>
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="email-host" className="w-1/4">
        Hostitel a port
      </label>
      <div className="flex w-3/4 flex-row items-center gap-2">
        <Input
          type="text"
          id="email-host"
          name="host"
          placeholder="Hostitel"
          className="w-1/2"
          onChange={onChange}
          value={formData.host}
        />
        :
        <Input
          type="text"
          id="email-port"
          name="port"
          placeholder="Port"
          className="w-1/4"
          onChange={onChange}
          value={formData.port}
        />
      </div>
    </div>
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="email-username" className="w-1/4">
        Uživatelské jméno
      </label>
      <Input
        type="text"
        id="email-username"
        name="username"
        placeholder="Uživatelské jméno"
        className="w-3/4"
        onChange={onChange}
        value={formData.username}
      />
    </div>
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="email-password" className="w-1/4">
        Heslo
      </label>
      <Input
        type="password"
        id="email-password"
        name="password"
        placeholder="Heslo"
        className="w-3/4"
        onChange={onChange}
        value={formData.password}
      />
    </div>
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="sender-address" className="w-1/4">
        Adresa odesílatele
      </label>
      <div className="flex w-3/4 flex-row items-center gap-2">
        <Input
          type="text"
          id="sender-address"
          name="senderAddress"
          placeholder="Adresa odesílatele"
          className="w-1/2"
          onChange={onChange}
          value={formData.senderAddress}
        />
        @
        <Input
          type="text"
          id="sender-domain"
          name="senderDomain"
          placeholder="Doména"
          className="w-1/4"
          onChange={onChange}
          value={formData.senderDomain}
        />
      </div>
    </div>
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="sender-name" className="w-1/4">
        Jméno odesílatele
      </label>
      <Input
        type="text"
        id="sender-name"
        name="senderName"
        placeholder="Jméno odesílatele"
        className="w-3/4"
        onChange={onChange}
        value={formData.senderName}
      />
    </div>
  </div>
);

export default EmailServerSettings;
