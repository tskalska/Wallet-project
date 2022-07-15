import "../../css/main.min.css";
import { Circles } from "react-loader-spinner";

function Loader({ color, size }) {
  return (
    <div className="loaderSection">
      <Circles color={color} height={size} width={size}/>
    </div>
  );
}
export default Loader;
