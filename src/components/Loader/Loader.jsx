import LoaderImg from "../../assets/loader.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className='loader flex flex-c'>
      <img src = {LoaderImg} alt = "loader" />
    </div>
  )
}

export default Loader