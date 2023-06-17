# Procees App

Procees is an automation application for managing tasks for a large number of people. It is built using:

- ![Vue 3](https://img.shields.io/badge/-Vue%203-4FC08D?style=flat&logo=Vue.js&logoColor=white)
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=Vite&logoColor=white)

It utilizes ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=Firebase&logoColor=black) for data storage and authentication.

## Overview

The Procees app allows users to manage processes consisting of different blocks of activity. Users can view a list of processes, click on a process to view its details, and interact with various blocks associated with the process. These blocks can include starting a process, completing a form, having a conversation, and receiving system notifications.

The app is divided into two main parts: ADMIN and USER.

## Additional Dependencies

The Procees app utilizes the following additional dependencies:

- ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=Firebase&logoColor=black) Firebase is a comprehensive suite of cloud-based tools provided by Google for building web and mobile applications. It offers features such as authentication, real-time database, cloud storage, and more.
- ![Crypto-Random-String](https://img.shields.io/badge/-Crypto--Random--String-FF6F00?style=flat) Crypto-Random-String is a JavaScript library that provides a simple way to generate cryptographically strong random strings. It is often used for generating unique identifiers or secure tokens.
- ![Vuefire](https://img.shields.io/badge/-Vuefire-42A97A?style=flat&logo=Vue.js&logoColor=white) Vuefire is an official Firebase integration for Vue.js. It enables seamless binding between Vue components and Firebase real-time database, making it easier to synchronize and manage data.
- ![Vuex](https://img.shields.io/badge/-Vuex-4FC08D?style=flat&logo=Vue.js&logoColor=white) Vuex is a state management pattern and library for Vue.js applications. It provides a centralized store for managing the state of the application, allowing efficient data sharing and synchronization between components.
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat&logo=Tailwind%20CSS&logoColor=white) Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined utility classes. It allows developers to rapidly build custom user interfaces by composing utility classes, resulting in efficient and flexible styles.

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

![Imgur](https://i.imgur.com/xQkiqvr.png)

### Creating a New Process - Enter Process Name and Details

When creating a process, the administrator provides a name and details for the process and adds tasks to it. The interface consists of two panels:

1. **Console Panel** (black color): Displays basic blocks available for the administrator.
2. **Window Panel**: Adjusts based on the selected block from the console.

The administrator is shown four blocks on the console:
- View Process
- Create Tasks
- Conversation Session
- Event Log

![Imgur](https://i.imgur.com/G9vYLF1.png)

### Creating a New Process - Name and Details Filled

After entering the process name and details, the administrator needs to add tasks to the process.

The name of the newly created process is updated in the left column.

![Imgur](https://i.imgur.com/JZOoFcy.png)

### Creating a New Process - Create Tasks

Tasks are added and created by selecting the "Tasks" block on the console. This opens an additional "Tasks" column next to the console, displaying all tasks and an "Add New Task" button.

The "Tasks" block contains two categories:
- Edit Task
- Task Users

When creating a new task, the administrator provides its name, details, and can add fields for filling using the "Add Fields" button. The right column provides options for editing the fields.

![Imgur](https://i.imgur.com/uNbrWLU.png)

### Creating a New Process - Task Name and Details Filled, Created JMBAG Text Field

The name and details of the task are filled. The name of the newly created task is updated in the "Tasks" column.

Fields can be added to the task using the "Add Field" button. The right column provides options for editing the field properties. Possible field types include Text Field, Number Field, File Field, Dropdown Field, Boolean Field, Blob Field, etc.

![Imgur](https://i.imgur.com/h9g5IlR.png)

### Creating a New Process - More Fields Added and Task Saved

More fields can be added to the task. Once the task is completed, it can be saved or deleted. The "Next Task" option determines the following task in the process. It can be set as automatic (the task below it) or as a specific task, switch, if-else, or subprocess.

![Imgur](https://i.imgur.com/om6U9Yh.png)

### Creating a New Process - Added More Tasks

Additional tasks can be added to the process, and they will be displayed in the "Tasks" column.

![Imgur](https://i.imgur.com/aAwI6Mq.png)

### Creating a New Process - Set Task User Settings

Privileges for the task can be set in the "Task Users" category. The administrator can define task visibility, edit permissions, and completion permissions for different roles (e.g., PROFESSOR and STUDENT).

![Imgur](https://i.imgur.com/n5O6z37.png)

### View Process

After the tasks have been added, we return to the "Process" block. Here, we can see tasks in progress with associated numbers indicating their status:

- ![Blue](https://img.shields.io/badge/-Blue-007BFF?style=flat&logoColor=white&color=007BFF): Tasks started by users
- ![Red](https://img.shields.io/badge/-Red-DC3545?style=flat&logoColor=white&color=DC3545): Tasks in progress
- ![Yellow](https://img.shields.io/badge/-Yellow-FFC107?style=flat&logoColor=white&color=FFC107): Tasks finished by users

Tasks initially don't have numbers, but they receive numbers when users start the process and begin solving the tasks. Selecting a task displays additional statistics at the bottom, including:

- Tasks started: Number of users who started the task and the start date
- Tasks in progress: Number of users currently working on the task and the duration of the solution
- Tasks finished: Number of users who completed the task and the completion date

You can click on each user to view their process and progress.

![Imgur](https://i.imgur.com/VfYXFpT.png)

### Process Diagram

In the "Process Diagram" category, the process flow and its tasks are graphically displayed.

![Imgur](https://i.imgur.com/DGRGQhI.png)

### Process Analytics - Process Overview

In the "Process Analytics" category, the progress of the process and all its users is shown, both overall and for each task individually. It opens with an additional column next to the console where the Process Overview and Tasks are displayed.

![Imgur](https://i.imgur.com/PCbucUN.png)

### Process Analytics - Task Overview

By selecting a task, the statistics for that task are displayed, including:

- Tasks started: Number of users who started the task and the start date
- Tasks in progress: Number of users currently working on the task and the duration of the solution
- Tasks finished: Number of users who completed the task and the completion date

![Imgur](https://i.imgur.com/BPWknnq.png)

### Process Users

The "Process Users" category allows you to set privileges for the process:

- Process visibility: Who can see the process
- Process edit: Who can edit the process
- Process completion: Who can solve the process

Users in the process are labeled as "PROFESSOR" or "STUDENT" for easier sorting. The professor can invite other users to join the process, and a label can be added to each user for easier sorting. The "Automatic new user tag" feature automatically tags new users when they join.

![Imgur](https://i.imgur.com/ulDHBxk.png)

### Conversation Session - Edit Session

The "Conversation Session" block contains all conversations related to the process. It opens with an additional column called "Sessions" next to the console, displaying all conversations and the "Add new session" button for adding new conversations.

The "Conversation Session" block has two categories:

- Edit Session
- View Session

When creating a new conversation, you can provide its name and details and set chat privileges, including session visibility (who can see the conversation) and session edit (who can edit the conversation). All users in the conversation are displayed, and additional users can be invited.

![Imgur](https://i.imgur.com/MbHQ8iu.png)

### Conversation Session - View Session

The "View Session" category provides a classic chat view similar to Slack or Discord.

![Imgur](https://i.imgur.com/PCgx5oP.png)

### Event Logs - All Log Events

The "Event Log" block contains all events related to the process. It opens with an additional column called "Log Event" next to the console, displaying all events.

The "Event Log" block has two categories:

- View Event
- Create Event

In "All Log Events," you can see the event details, including when the event occurred, who started it, and which event was triggered. The column on the right side is used for sorting events based on selection.

![Imgur](https://i.imgur.com/3FXzUhE.png)

### Event Logs - Process Events

The "Process Events" category displays all events related specifically to the process, such as when the process is created, joining the process, and finishing the process.

![Imgur](https://i.imgur.com/h9XN7xS.png)

### Event Logs - Task Events

The "Task Events" category displays all events related specifically to tasks, such as when a task is created, starting the task solution, and task completion.

![Imgur](https://i.imgur.com/S0yYeSf.png)

### Event Logs - Conversation Events

The "Conversation Events" category shows all events related specifically to conversations, such as opening and closing a conversation.

![Imgur](https://i.imgur.com/EMUXs0B.png)

## USER

Log in as user using a pre-made user emails and passwords.

### My Process - View Process

A user (student) who joins a process sees two blocks in the console:
- My Process
- Conversation Session

The user can only see and interact with the processes they are assigned to. Pressing the "Start Process" button initiates their assigned process.

![Imgur](https://i.imgur.com/i5kI40i.png)

### Current Task

Once a user starts their process, a "Current Task" block is created, displaying the fields that need to be filled. The user can complete the task by filling in the fields and clicking the "Complete Task" button.

![Imgur](https://i.imgur.com/XYLtbOJ.png)

### My Process - Process Diagram

The process diagram is adapted to the user's assigned process automatically.

![Imgur](https://i.imgur.com/ELitEAM.png)

## Contributing

If you would like to contribute to AquaPod, feel free to open issues and submit pull requests. We welcome contributions from the community!

## License

The AquaPod frontend is released under the ![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
