import KdsButton from "./KdsButton";

const KdsNavbar = () => {
  return (
    <nav className="flex items-center justify-center gap-8">
      <KdsButton onClick={() => {}}>Souhrn</KdsButton>
      <KdsButton onClick={() => {}}>Objednávky</KdsButton>
      <KdsButton onClick={() => {}}>Úprava jídel</KdsButton>
    </nav>
  );
};

export default KdsNavbar;
