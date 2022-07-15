import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import home from "../../img/icons/home.svg";
import statistics from "../../img/icons/statistics.svg";
import currency from "../../img/icons/currency.svg";

import "../../css/main.min.css";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <ul className="navigationList">
        <li className="navigationItem">
          <NavLink
            to="/home"
          >
            <img
              className={ location.pathname === "/home" ? "navigationImgActive navigationImg":"navigationImg"}
              src={home}
              width="38px"
              height="38px"
              alt="Иконка дома"
            />
            <p className={ location.pathname === "/home" ? "navigationActiveLink navigationText":"navigationLink navigationText"}>Главная</p>
          </NavLink>
        </li>

        <li className="navigationItem">
          <NavLink
            to="/diagram"
          >
            <img
              className={ location.pathname === "/diagram" ? "navigationImgActive navigationImg":"navigationImg"}
              src={statistics}
              width="38px"
              height="38px"
              alt="Иконка статистика"
            />
            <p className={location.pathname === "/diagram" ? "navigationActiveLink navigationText" : "navigationLink navigationText"}>Статистика</p>
            
          </NavLink>
        </li>

        <li className="navigationItem navigationCurrencyItem">
          <NavLink
            to="/currency"
          >
            <img
              className={ location.pathname === "/currency" ? "navigationImgActive navigationImg":"navigationImg"}
              src={currency}
              width="38px"
              height="38px"
              alt="Иконка валюты"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
