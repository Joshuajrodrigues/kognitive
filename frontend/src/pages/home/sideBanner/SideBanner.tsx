import { FunctionComponent } from "react";
import './SideBanner.scss'
import Lottie from 'react-lottie'
import animationData from '../../../lotties/hero.json'
const SideBanner: FunctionComponent<{}> = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <Lottie
       options={defaultOptions}
       height={410}
       width={410}
      />
    </>
  );
};

export default SideBanner;
