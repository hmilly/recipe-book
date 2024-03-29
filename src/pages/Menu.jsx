import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import BurgerCard from "../components/BurgerCard";
import Footer from "../components/Footer";
import AppContext from "../context/AppContext";

const Menu = () => {
  const { allBurgers } = useContext(AppContext);

  const [num, setnum] = useState(9);
  const [btn, setbtn] = useState(true);
  // json-server -p 8080 ./public/db.json

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showMoreOrLess = () => {
    setbtn(!btn);
    num === 12 ? setnum(9) : setnum(12);
  };

  return (
    <>
      <Header />
      <main className="menu">
        <div className="top">
          <h2>Explore our Menus</h2>
          <p>
            Choose from an ever-changing mix of meat, fish, Beyond Meat™, WW
            Approved, Diabetes Friendly recipes and health-conscious offerings.
          </p>
        </div>
        <div className="mid">
          {allBurgers.slice(0, num).map((b, i) => (
            <BurgerCard burgerObj={b} key={i} />
          ))}
        </div>
        <div className="bot">
          <button className="onclickBtn" onClick={showMoreOrLess}>
            {btn === true ? "SEE MORE" : "SEE LESS"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Menu;
