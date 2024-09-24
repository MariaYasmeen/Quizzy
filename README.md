# WEB-BASED QUIZ TAKING APPLICATION DOCUMENTATION

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Usage](#usage)
   - [User Roles](#user-roles)
   - [Creating a Quiz](#creating-a-quiz)
   - [Taking a Quiz](#taking-a-quiz)
4. [Tools](#tools)
5. [Accessibility Features](#accessibility-features)
   - [Public Quizzes](#public-quizzes)
   - [Private Quizzes](#private-quizzes)
6. [API Documentation](#api-documentation)

## Introduction

The Quiz Web App is an innovative platform designed to streamline the quiz creation and taking process for educators and students. This application empowers teachers to craft engaging quizzes that facilitate learning and assessment. By providing immediate feedback and progress tracking, the platform enhances educational outcomes and promotes active participation in learning.

## Features

- **Teacher Dashboard**: A comprehensive interface for teachers to create, edit, and manage quizzes. Teachers can also close quizzes automatically when the allotted time expires.
- **Student Interface**: An intuitive interface for students to easily access and take quizzes assigned to them, ensuring a seamless user experience.
- **Real-time Results**: Students receive immediate feedback on their performance, allowing for a better understanding of their strengths and areas for improvement.
- **Question Types**: The platform supports various question formats, including multiple-choice and true/false, catering to diverse assessment needs.
- **Progress Tracking**: Teachers can monitor student progress and performance over time, enabling targeted interventions and personalized instruction.
- **User Notifications**: Automated notifications for both students and teachers regarding quiz deadlines and results to enhance engagement.
- **Responsive Design**: The application is fully responsive, ensuring usability across devices including desktops, tablets, and smartphones.
- **Quiz Analytics**: Detailed analytics for teachers that show overall class performance, question difficulty ratings, and more.
- **Accessibility Features**: The application is designed to be accessible to users with disabilities, adhering to web accessibility standards.

## Usage

### User Roles

- **Teacher**: Creates and manages quizzes.
- **Student**: Takes quizzes and views results.

### Creating a Quiz

1. **Log in as a Teacher**: Access the teacher dashboard using your credentials.
2. **Navigate to the "Create Quiz" Section**: Click on the designated area to start quiz creation.
3. **Fill in Quiz Details**: Enter the quiz title, description, and any relevant instructions for students.
4. **Add Questions**: Input questions along with answer options. Indicate the correct answers for grading purposes.
5. **Save and Publish**: Save the quiz, and publish it for student access.

### Taking a Quiz

1. **Log in as a Student**: Use your credentials to access the student interface.
2. **Go to the "Available Quizzes" Section**: Browse through the list of quizzes assigned to you.
3. **Select a Quiz**: Click on the quiz you wish to take.
4. **Complete the Quiz**: Answer all questions and submit your responses.
5. **View Results**: Access your results immediately after submission, along with feedback on your performance.

## Tools

### Front End

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS / Vanilla CSS**: For styling and responsive design.
- **Redux / React Query**: State management and data fetching.

### Back End

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## Accessibility Features

The application includes several accessibility options, classified into two categories:

### Public Quizzes

- **Description**: These quizzes are available to all registered users. Any student who has signed up on the platform can access and take these quizzes.
- **Functionality**: Teachers can create public quizzes that are open for all students, promoting inclusivity and wider participation.

### Private Quizzes

- **Description**: These quizzes are restricted to specific students listed by the teacher. Only those students who have been added can access these quizzes.
- **Functionality**: Ideal for targeted assessments, teachers can assign private quizzes to students who need additional support or have specific learning goals.

## API Documentation

_Further details on the API can be provided in this section._
[API](https://documenter.getpostman.com/view/37500173/2sAXqp9jPW)
