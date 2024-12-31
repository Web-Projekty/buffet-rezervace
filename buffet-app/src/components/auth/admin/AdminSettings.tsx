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
      </form>
    </div>
  );
};

export default AdminSettings;
