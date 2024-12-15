const AdminSettings = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-white">
      <h1>Admin nastavení</h1>
      <form className="grid grid-flow-row grid-cols-5 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="decryptKey">TIMESLOT</label>
          <input type="time" id="decryptKey" name="decryptKey" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="maxOrdersPerTimeSlot">
            Maximalní počet objd. na TIMESLOT
          </label>
          <input
            type="text"
            id="maxOrdersPerTimeSlot"
            name="maxOrdersPerTimeSlot"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="decryptKey">DECRYPT KEY</label>
          <input type="text" id="decryptKey" name="decryptKey" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dbHost">DB HOST</label>
          <input type="text" id="dbHost" name="dbHost" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dbUser">DB USER</label>
          <input type="text" id="dbUser" name="dbUser" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dbPass">DB PASS</label>
          <input type="password" id="dbPass" name="dbPass" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dbName">DB NAME</label>
          <input type="text" id="dbName" name="dbName" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ldapHost">LDAP HOST</label>
          <input type="text" id="ldapHost" name="ldapHost" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ldapUser">LDAP USER</label>
          <input type="text" id="ldapUser" name="ldapUser" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ldapPass">LDAP PASS</label>
          <input type="password" id="ldapPass" name="ldapPass" />
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
