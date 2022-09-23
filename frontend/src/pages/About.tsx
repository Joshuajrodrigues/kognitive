import { Box, Button, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar";
import LottieCreator from "../components/LottieCreator";
import lottieSrc from "../lotties/hero-about.json";
const About: FunctionComponent<{}> = () => {
  return (
    <div className="home-grid-container"
    >
      <div className="lottie-container">
        <LottieCreator
          style={{ height: "300px", width: "400px" }}
          loop={true}
          src={lottieSrc}
        />
      </div>

      <div className="login-container"
      >
        <p className="intro-text">
          Cognitive behavioral therapy (CBT) is a psycho-social intervention
          that aims to reduce symptoms of various mental health conditions,
          primarily depression and anxiety disorders. CBT focuses on challenging
          and changing cognitive distortions (such as thoughts, beliefs, and
          attitudes) and their associated behaviors to improve emotional
          regulation and develop personal coping strategies that target solving
          current problems. Though it was originally designed to treat
          depression, its uses have been expanded to include the treatment of
          many mental health conditions, including anxiety, substance use
          disorders, marital problems, and eating disorders. CBT includes a
          number of cognitive or behavioral psychotherapies that treat defined
          psychopathologies using evidence-based techniques and strategies

          <a
            className="link-button"
            target={"_blank"}
            href={"https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy"}
          >

            {" "} <u>Read More
            </u>

          </a>
        </p>
        <br />
        <BackButton />
      </div>
    </div>
  );
};

export default About;
