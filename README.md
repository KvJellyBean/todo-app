<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/KvJellyBean/todo-app">
    <img src="./src/images/logoBanner.jpeg" alt="Logo Banner">
  </a>

<h3 align="center">Jellist</h3>

  <p align="center">
    A responsive to-do list application that prioritizes and categorizes tasks effortlessly for enhanced productivity.
    <br />
    <a href="https://kvjellybean.github.io/todo-app/">View Demo</a>
    ·
    <a href="https://github.com/KvJellyBean/todo-app/issues">Report Bug</a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ul>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Jellist GIF][product-gif]](https://github.com/KvJellyBean/todo-app)

Introducing Jellist, a responsive task management app that goes beyond the basics. View all your tasks with ease, and navigate effortlessly through specific categories such as tasks for today, tasks for the week, completed tasks, and prioritize based on urgency. Tailor your experience by organizing tasks according to specific projects you've created. Jellist ensures a seamless and organized task management experience, empowering you to stay on top of your daily responsibilities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Quickly set up a local copy by following these simple steps for a seamless start.

### Prerequisites

- Web browser (Google Chrome recommended)
- Node package manager (npm)
  ```sh
  npm install npm@latest -g
  ```

### Installation

- Clone the repository to your local machine
  ```sh
    git clone https://github.com/KvJellyBean/todo-app.git
  ```
- Navigate to your local project
  ```sh
  cd todo-app
  ```
- Install dependencies
  ```sh
    npm install
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- Build and start the project
  ```sh
    npm run start
  ```
- If the project is not yet open, open it using `http://localhost:8080`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Create Task (to-do list) logic
  - [x] Add, edit and delete task
  - [x] Show detailed information for each task
  - [x] Toggle the status of to-do list items
- [x] Create Project logic
  - [x] Add, rename and delete Project
- [x] Realtime integration
  - [x] Utilize `date-fns` plugin for handling dates
  - [x] Implement real-time updates for due dates
- [x] Implement local storage
- [x] Categorization
  - [x] Add navigation categories for task (`All Task` `Today` `This Week` `Priority` `Completed`)
  - [x] Add navitagion tab for `Project` to show each project's to do list
- [x] Responsive Web Design

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have suggestions to enhance this project, feel free to fork the repo and submit a pull request. Alternatively, you can open an issue with the "enhancement" tag. Your contributions are highly valued and will help make this project even better. Thank you for your support! 🚀

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-gif]: ./src/images/todoapp.gif
