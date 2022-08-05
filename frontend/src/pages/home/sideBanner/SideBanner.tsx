import { Player } from "@lottiefiles/react-lottie-player";
import { FunctionComponent } from "react";


const SideBanner: FunctionComponent<{ src: string | object, loop: boolean }> = ({ src, loop }) => {

  return (
    <>
      <Player
        keepLastFrame
        autoplay
        loop={loop}
        src={src}
      />

    </>
  );
};

export default SideBanner;
