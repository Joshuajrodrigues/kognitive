import { Player } from "@lottiefiles/react-lottie-player";
import { FunctionComponent } from "react";


const SideBanner: FunctionComponent<{ src: string | object, loop: boolean, style?: React.CSSProperties | undefined }> = ({ src, loop, style }) => {

  return (
    <>
      <Player
        keepLastFrame
        style={style}
        autoplay
        loop={loop}
        src={src}
      />

    </>
  );
};

export default SideBanner;
