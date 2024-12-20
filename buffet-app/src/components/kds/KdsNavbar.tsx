import KdsButton from "./KdsButton";

const KdsNavbar = () => {
  return (
    <nav className="flex items-center justify-center gap-8">
      <KdsButton linkTo="souhrn">Souhrn</KdsButton>
      <KdsButton linkTo="objednavky">Objednávky</KdsButton>
      <KdsButton linkTo="uprava-menu">Úprava jídel</KdsButton>
    </nav>
  );
};

export default KdsNavbar;
