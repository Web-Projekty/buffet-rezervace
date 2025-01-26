import Input from "../../../../ui/Input";

export type LDAPForm = {
  host: string;
  port: string;
  username: string;
  password: string;
};

const LDAPSettings = ({
  formData,
  onChange,
}: {
  formData: LDAPForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid w-full grid-rows-3 gap-2">
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="ldap-host" className="w-1/4">
        Hostitel a port
      </label>
      <div className="flex flex-1 flex-row items-center gap-2">
        <Input
          type="text"
          id="ldap-host"
          name="host"
          placeholder="Hostitel"
          className="flex-1"
          onChange={onChange}
          value={formData.host}
        />
        :
        <Input
          type="text"
          id="ldap-port"
          name="port"
          placeholder="Port"
          className="w-1/4"
          onChange={onChange}
          value={formData.port}
        />
      </div>
    </div>
    <div className="flex flex-1 flex-row items-center gap-4">
      <label htmlFor="ldap-username" className="w-1/4">
        Uživatelské jméno
      </label>
      <Input
        type="text"
        id="ldap-username"
        name="username"
        placeholder="Uživatelské jméno"
        className="flex-1"
        onChange={onChange}
        value={formData.username}
      />
    </div>
    <div className="flex flex-1 flex-row items-center gap-4">
      <label htmlFor="ldap-password" className="w-1/4">
        Heslo
      </label>
      <Input
        type="password"
        id="ldap-password"
        name="password"
        placeholder="Heslo"
        className="flex-1"
        onChange={onChange}
        value={formData.password}
      />
    </div>
  </div>
);

export default LDAPSettings;
