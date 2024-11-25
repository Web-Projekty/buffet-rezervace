import Button from "../Button";

const KdsOrder = () => {
  return (
    <div className="m-2 flex h-[22rem] w-[20rem] flex-col bg-white">
      <div className="w-full bg-orange-400 px-4 py-3 text-xl font-bold">
        #148
      </div>
      <div className="m-2">
        <div className="text-sm">Order 1</div>
        <div className="text-sm">Order 2</div>
        <div className="text-sm">Order 3</div>
      </div>

      <Button className="bottom-0 m-2 mt-auto rounded-none border-0 bg-green-400">
        Hotovo
      </Button>
    </div>
  );
};

export default KdsOrder;
