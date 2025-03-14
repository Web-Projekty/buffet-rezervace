const EmptyCart = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-1 font-FiraSans text-xl text-white">
      <p className="text-center text-white">Váš košík je prázdný.</p>
      <span className="text-2xl">😢</span>
    </div>
  );
};

export default EmptyCart;
