import { Box, Button, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/backButton/BackButton";
import Navbar from "../../components/navbar/Navbar";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import lottieSrc from "../../lotties/hero-about.json";
const About: FunctionComponent<{}> = () => {
  return (
    <SimpleGrid
      marginTop={{ md: "10%" }}
      spacing="8"
      textAlign="center"
      columns={{ base: 1, sm: 1, md: 2 }}
    >
      <Box width={"100%"} height={"100%"}>
        <LottieCreator
          style={{ height: "300px", width: "400px" }}
          loop={true}
          src={lottieSrc}
        />
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="md"
        bgColor={"purple.50"}
        borderColor={"purple.500"}
        margin={{ base: "auto", sm: "auto" }}
        padding={{ base: "4", sm: "4" }}
        width={{ base: "80%", sm: "80%", md: "80%" }}
      >
        <Text color={"purple.500"}>
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
        </Text>
        <a
          target={"_blank"}
          href={"https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy"}
        >
          <Button variant={"link"} mt={4} colorScheme={"purple"} type="submit">
            Read More
          </Button>
        </a>
        <br />
      </Box>
        <BackButton />
    </SimpleGrid>
  );
};

export default About;
