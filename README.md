# The Problem

2022 was a difficult year and while browsing online I found a lot of books and apps for Cognitive Behavioral Therapy.However these were very expansive and at times unavailable in my region, some of my friends were even paying outrageous amounts for the forms. Some of which would either get misplaced (Physical) or used for ad targeting (applications).

# The Solution

Kognitive is a CBT journaling app designed to make the process of practicing Cognitive Behavioral Therapy more manageable and structured. It provides users with a digital platform to journal their thoughts, feelings, and behaviors, making it easier to recognize patterns and apply CBT techniques for better mental health.

![dashboard](/public/kognitive/dash.png)
# Features

Kognitive offers several key features:

- **PWA:** It is a progressive web app, can be installed on your phone like a native app.

- **Daily checkin:** A general space for users to record their thoughts and emotions, organized by date and time.

- **SMART goal builder:** Users can track their goals and get a clear picture of what they want and how they can archive it.

- **Stress manager:** A feature for recording and analyzing stress, helping users understand how their actions relate to their thoughts and emotions.

- **Worry challenge:** Kognitive offers a form to challenge worry thoughts, to jot them down and to make sense of them.

- **Breakdown argument:** Ever had those arguments that ruin your entire day ? This is for you.

- **History:** Kognitive offers a histroy table where you can view your past entries.
![history](/public/kognitive/history.png)
# Challenges

1. **User Engagement:** Usually you see these apps use gamification tactics and rewards, they are flashy or too bubbly. I persoanlly find this to be a bad design for an app where the user comes in with varid mental states and stresses

   - **Solution:** Kognitive employs clean and soft ui. It does not force your hand at anything, dont want to wite a step, thats ok. The app stays out of your way and neutral to make sure the user can focus on themselves
![example](/public/kognitive/example.png)
2. **Data Privacy and Security:** Safeguarding sensitive user data and ensuring the privacy of their thoughts and emotions is crucial in a mental health app.

   - **Solution:** Konitive is opensource, you can clone host this on your personal supabse db, there are no ads and its free.

3. **Forms:** The forms provided in kognitive have a slightly complex state mangment system.

   - **Solution:** It was made easier by using zustand over redux as it felt like the perfect balance for an app like this
   

# Future Plans

Kognitive aims to continue evolving to better serve its users:


- **Enhanced Analytics:** Improving the app's data analysis capabilities to offer more insights into thought, emotion, and behavior patterns.

- **Mood Prediction:** Implementing AI-driven mood prediction to help users anticipate and manage emotional states.

- **Personalized CBT Plans:** Developing personalized CBT plans based on user data, allowing for tailored therapeutic experiences.
