import { FunctionComponent } from "react";
import BackButton from "../../components/backButton/BackButton";
import Navbar from "../../components/navbar/Navbar";
import './about.scss'
const About: FunctionComponent<{}> = () => {
    return (
        <div className="about-container">
            <p>
                Cognitive behavioral therapy (CBT) is a common type of talk therapy (psychotherapy).
                You work with a mental health counselor (psychotherapist or therapist) in a structured way,
                attending a limited number of sessions.
                CBT helps you become aware of inaccurate or negative thinking so you can view challenging situations more clearly and respond to them in a more effective way.
            </p>

            <p>
                CBT can be a very helpful tool ― either alone or in combination with other therapies ― in treating mental health disorders,
                such as depression, post-traumatic stress disorder (PTSD) or an eating disorder.
                But not everyone who benefits from CBT has a mental health condition.
                CBT can be an effective tool to help anyone learn how to better manage stressful life situations.
            </p>
            <BackButton />
        </div>
    )
}

export default About