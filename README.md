# Procees App

Procees is an automation application for managing tasks for a large number of people. It is built using:

- ![Vue 3](https://img.shields.io/badge/-Vue%203-4FC08D?style=flat&logo=Vue.js&logoColor=white)
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=Vite&logoColor=white)

It utilizes ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=Firebase&logoColor=black) for data storage and authentication.

## Overview

The Procees app allows users to manage processes consisting of different blocks of activity. Users can view a list of processes, click on a process to view its details, and interact with various blocks associated with the process. These blocks can include starting a process, completing a form, having a conversation, and receiving system notifications.

The app is divided into two main parts: ADMIN and USER.

## Getting Started

To get started with the Procees app locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your/repository.git
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

3. Set up Firebase and configure your app.

4. Run the development server:

   ```shell
   npm run dev
   ```

   Alternatively, if you need to specify a host:

   ```shell
   npm run dev -- --host
   ```

Open your web browser and visit `localhost` to see the AquaPod frontend in action.

## ADMIN

Log in as admin using a pre-made admin email and password.

### Creating a New Process - Create Process

The initial form of the application where the administrator (professor) creates a new process. The left column displays all the processes.

### Creating a New Process - Enter Process Name and Details

When creating a process, the administrator provides a name and details for the process and adds tasks to it. The interface consists of two panels:

1. **Console Panel** (black color): Displays basic blocks available for the administrator.
2. **Window Panel**: Adjusts based on the selected block from the console.

The administrator is shown four blocks on the console:
- View Process
- Create Tasks
- Conversation Session
- Event Log

### Creating a New Process - Name and Details Filled

After entering the process name and details, the administrator needs to add tasks to the process.

The name of the newly created process is updated in the left column.

### Creating a New Process - Create Tasks

Tasks are added and created by selecting the "Tasks" block on the console. This opens an additional "Tasks" column next to the console, displaying all tasks and an "Add New Task" button.

The "Tasks" block contains two categories:
- Edit Task
- Task Users

When creating a new task, the administrator provides its name, details, and can add fields for filling using the "Add Fields" button. The right column provides options for editing the fields.

### Creating a New Process - Task Name and Details Filled, Created JMBAG Text Field

The name and details of the task are filled. The name of the newly created task is updated in the "Tasks" column.

Fields can be added to the task using the "Add Field" button. The right column provides options for editing the field properties. Possible field types include Text Field, Number Field, File Field, Dropdown Field, Boolean Field, Blob Field, etc.

### Creating a New Process - More Fields Added and Task Saved

More fields can be added to the task. Once the task is completed, it can be saved or deleted. The "Next Task" option determines the following task in the process. It can be set as automatic (the task below it) or as a specific task, switch, if-else, or subprocess.

### Creating a New Process - Added More Tasks

Additional tasks can be added to the process, and they will be displayed in the "Tasks" column.

### Creating a New Process - Set Task User Settings

Privileges for the task can be set in the "Task Users" category. The administrator can define task visibility, edit permissions, and completion permissions for different roles (e.g., PROFESSOR and STUDENT).

### View Process

After adding tasks, the administrator can return to the "Process" block. Tasks in progress are indicated by numbers:
- ![Blue](https://img.shields.io/badge/-Blue-007BFF?style=flat&logoColor=white&color=007BFF) Tasks started by users
- ![Red](https://img.shields.io/badge/-Red-DC3545?style=flat&logoColor=white&color=DC3545) Tasks in progress
- ![Yellow](https://img.shields.io/badge/-Yellow-FFC107?style=flat&logoColor=white&color=FFC107) Tasks finished by users

By selecting a task, the administrator can view additional statistics and details at the bottom of the interface. This includes the number of users who started the task, the start date, the number of users currently working on the task, the duration of the solution, the number of users who completed the task, and the completion date.

## USER

Log in as user using a pre-made user emails and passwords.

### My Process - View Process

A user (student) who joins a process sees two blocks in the console:
- My Process
- Conversation Session

The user can only see and interact with the processes they are assigned to. Pressing the "Start Process" button initiates their assigned process.

### Current Task

Once a user starts their process, a "Current Task" block is created, displaying the fields that need to be filled. The user can complete the task by filling in the fields and clicking the "Complete Task" button.

### My Process - Process Diagram

The process diagram is adapted to the user's assigned process automatically.

## Additional Dependencies

The Procees app utilizes the following additional dependencies:

- ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=Firebase&logoColor=black) Firebase is a comprehensive suite of cloud-based tools provided by Google for building web and mobile applications. It offers features such as authentication, real-time database, cloud storage, and more.
- ![Crypto-Random-String](https://img.shields.io/badge/-Crypto--Random--String-FF6F00?style=flat) Crypto-Random-String is a JavaScript library that provides a simple way to generate cryptographically strong random strings. It is often used for generating unique identifiers or secure tokens.
- ![Vuefire](https://img.shields.io/badge/-Vuefire-42A97A?style=flat&logo=Vue.js&logoColor=white) Vuefire is an official Firebase integration for Vue.js. It enables seamless binding between Vue components and Firebase real-time database, making it easier to synchronize and manage data.
- ![Vuex](https://img.shields.io/badge/-Vuex-4FC08D?style=flat&logo=Vue.js&logoColor=white) Vuex is a state management pattern and library for Vue.js applications. It provides a centralized store for managing the state of the application, allowing efficient data sharing and synchronization between components.
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat&logo=Tailwind%20CSS&logoColor=white) Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined utility classes. It allows developers to rapidly build custom user interfaces by composing utility classes, resulting in efficient and flexible styles.

## Contributing

If you would like to contribute to AquaPod, feel free to open issues and submit pull requests. We welcome contributions from the community!

## License

The AquaPod frontend is released under the ![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
