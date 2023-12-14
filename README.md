<a name="readme-top"></a>

<div align="center">
  <a href="https://linkedin.com/in/josemiguelbravomendez">
    <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555" alt="LinkedIn">
  </a>
</div>

<!-- Logo -->
<br />
<div align="center">
  <img src="frontend/public/assets/img/logo.png" alt="Logo" width="150" height="100">
  <p align="center">
    Welcome to my company project!
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">RoadMap</a></li>
    <li><a href="#figma">Figma</a></li>
    <li><a href="#backend">Backend</a></li>
    <li><a href="#installmongodb">Install MongoDB</a></li>
    <li><a href="#diagrams">Diagrams</a></li>
    <li><a href="#postman">PostMan</a></li>
    <li><a href="#frontend">Frontend</a></li>
    <li><a href="#appguide">App Guide</a></li>
    <li><a href="#iconsandcomponents">Icons and Components</a></li>
  </ol>
</details>

## About The Project

LearnEdge is a Online Course app.
Design for Mitca Studios.

Why I choose this project:
* The reason I chose this kind of project is because the company that i'm on works with projects for education so I thought what's better than a Online Course app :smile:

The idea of the project is simple the users are able to create their accounts as a students or teachers and depend in what role you choose you will be able to create courses and add content to them (teacher) or join courses and see their content (students) 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

This is the technologies that I had to use for this project, company chose.

* [![Express][Express.js]][Express-url]
* [![React][React.js]][React-url]
* [![Mongoose-ODM][Mongoose-ODM]][Mongoose-url]
* [![Mongodb][Mongodb]][Mongodb-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## RoadMap

For this project I have followed the Roadmap from Git(Projects) as our theacher request.
<br></br>
<img src="backend/public/img/Roadmap.png">

## Figma

The mockup has been made in <a href="https://www.figma.com/file/avrlJiOeIneXq5CDVriOe9/Mitca?type=design&node-id=0-1&mode=design&t=VaqrBnWqjKm7dp3e-0">Figma.</a>
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Backend

Let's start installing our project. First backend.
  
1. npm
    ```sh
      npm install npm@latest -g
    ```
2. Clone the repo
    ```sh
      git clone https://github.com/Canariiii/LearnEdge
    ```
3. Go to the dir backend/    
    ```sh
       cd learnedge/backend/
    ```
4. Install NPM packages
    ```sh
       npm install
    ```

### Install MongoDB

To install MongoDB API go to their <a href="https://www.mongodb.com/docs/manual/installation/">website</a>

### Diagrams
<h1>Tree Diagram</h1>
<img src="backend/public/img/treeDiagram.png"></img>
<h2>Data Model</h2>
<p>
  In this project the main CRUD is made in the model Courses because every single class has something to do with it. As a nonSql database our AED teacher told us to do no more than 2 levels.
</p>
<h2>User Case<h2>
<img src="backend/public/img/useCase.png"></img>
  
<p><p align="right">(<a href="#readme-top">back to top</a>)</p></p>

### PostMan

Here's is a link to see al the end-points working with <a href="https://documenter.getpostman.com/view/30153359/2s9YkkfNm5">PostMan</a> tool.

<p><p align="right">(<a href="#readme-top">back to top</a>)</p></p>

## Frontend

Once we have everything install in our backend, we can continue with the frontend.

1. Go to the dir backend/    
    ```sh
       cd learnedge/frontend/
    ```
2. Install NPM packages
    ```sh
       npm install
    ```

### App Guide

<h2>Log In and Sign Up Guide</h2>

Users will be able to create their account as both roles students and instructors. They won't be able to create account as admin because that won't be a wise thing to do. User if they want to be admin the actual admin is the one that can change the roles of others.

<h2>Users Guide</h2>

As I say before users are allowed to creat two of three of the roles (student and instructors).

If users create their account as students they will be able to join courses and see the content inside of them. Students can join multiple courses at the time not only one. Every user dispite their role can do their own CRUD of their profile. Student also will have their own Active Course page where shows a list of the courses that they are on and there is where they will be able to exit the course.

If users choose to be instructors they will be able not only to create courses but upload content as well. Like students, instructors have an Active Course where they can erease the courses that their are instructor of and edit them.

The admin user which at first theres only one is able to manage both users and courses.

<h3>Courses Guide</h3>

Like I say before to create courses the user must have the role of instructor.

To create a course the instructor need to enter some parematers such as the title, description and a filename(a course picture).

To add content to their course the instructor need to create a content first unless they already have content created. Once the content is uploaded the instructor needs to go to the course that they want to add that content in and do a update of that course.

<h3>Content Guide</h3>

To create content the instructor needs to go to his personal profile page and clic on the Upload Content button and just fill the form which is only an input type file choose the content and post it.

<h3>Admin Guide</h3>

The users with admin role will be able to manage everything on the app. To make that happen in their personal page there's a manage button that takes to the Users CRUD and Courses CRUD. Once there the admins can choose if they want to manage the users or the courses.

### User Manual

Here is the user manual.

### Icons and Components

The icons used in the app are from <a href="https://ant.design/components/icon">Ant Design</a> and <a href="https://fontawesome.com/icons">FontAwesome</A>.

Components used are from <a href="https://ant.design/components/overview">Ant Design</a>.

[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Mongoose-ODM]: https://img.shields.io/badge/mongoose-FFA500?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/
[Mongodb]: https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[Mongodb-url]: https://www.mongodb.com/