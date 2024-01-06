export const appRoutes ={
    root:'/',
    login:'/login',
    signup:'/signup',
    about:'/about',
    cbtForm:'/cbtform',
    historicalSubmites: '/history',
    forgotPassword: '/resetpassword',
    miniFormStressPlan: '/stressmanagement',
    miniFormSMARTForm: '/smartform',
    miniFormWorry:'/worry',
    miniFormArgument:'/argument',
    
}

export const options = ["Terrible", "Bad", "Meh", "Ok Ok", "Good", "Terrific!"];

export const positive = [
    "Calm",
    "Confident",
    "Content",
    "Excited",
    "Fulfilled",
    "Grateful",
    "Happy",
    "Hopeful",
    "Inspired",
    "Loved",
    "Motivated",
    "Peaceful",
    "Proud",
    "Relived",
];
export const negative = [
    "Annoyed",
    "Anxious",
    "Disapointed",
    "Empty",
    "Frustrated",
    "Guilty",
    "Hopeless",
    "Lonely",
    "Nervous",
    "Overwhelmed",
    "Sad",
    "Stressed",
    "Tired",
    "Worried",
];

export const forms = ["Analyze Thoughts", "Practise Gratitude"];

export const thoughtDistortions = [
    {
        id: 1,
        name: "Catastrophizing",
        desc: "What if the worst happens ?",
    },
    {
        id: 2,
        name: "All-or-nothing thinking",
        desc: "I am a total failure.",
    },
    {
        id: 3,
        name: "Emotional Reasoning",
        desc: "I feel this way so it must be true.",
    },
    {
        id: 4,
        name: "Magnification of the Negative",
        desc: "I totally ruined everything.",
    },
    {
        id: 5,
        name: "Minimization of the Positive",
        desc: "They didnt really mean that.",
    },
    {
        id: 6,
        name: "Jumping to conclusions",
        desc: "She didnt say hi so she hates me.",
    },
    {
        id: 7,
        name: "Fortune telling",
        desc: "I will fail my exam.",
    },
    {
        id: 8,
        name: "Mind Reading",
        desc: "He doesnt want to talk to me.",
    },
    {
        id: 9,
        name: "Self Blaming",
        desc: "This is my fault.",
    },
    {
        id: 10,
        name: "Other blaming",
        desc: "This is thier fault.",
    },
    {
        id: 11,
        name: "Filtering out Positive",
        desc: "Nothing good happened today.",
    },
    {
        id: 12,
        name: "Overgeneralizing",
        desc: "Everyone dislikes me.",
    },
    {
        id: 13,
        name: "Labelig",
        desc: "I am a loser.",
    },
    {
        id: 14,
        name: "Should/Must Comments",
        desc: "I should have done this.",
    },
];

export const feelNows = [
    "Better than before",
    "About the same",
    "Worse than before",
];