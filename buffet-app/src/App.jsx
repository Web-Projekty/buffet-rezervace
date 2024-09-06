import FoodList from "./components/FoodList";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <FoodList />
      <Footer />
    </div>
  );
};

export default App;
