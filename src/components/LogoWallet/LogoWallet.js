import wallet from "../../img/icons/logo.svg";

import "../../css/main.min.css";

function LogoWallet() {
  return (
    <div className="linkLogo">
      <img className="logoImg" src={wallet} alt="логотип" />
      <span className="logoText">Wallet</span>
    </div>
  );
}

export default LogoWallet;
