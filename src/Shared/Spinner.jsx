import Lottie from "lottie-react";
import animation from "../assets/animation_llrpeujg.json";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center pt-32">
      <Lottie animationData={animation}></Lottie>
    </div>
  );
};

export default Spinner;
