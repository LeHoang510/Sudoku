# Introduction

This is the basic sudoku game web version using Angular for frontend and Springboot for backend

### How to run the game

- backend: `cd game/game-backend && mvn spring-boot:run`
- frontend: `cd game/game-frontend && npm start`

+ backend: http://localhost:4445/
+ frontend: http://localhost:8081/

### Structure
`game/game-backend` : This is the backend of the application contains the leaderboard and all levels. It contains the Java code of the server and in charge with providing a REST API.

`game/game-frontend` : This is the frontend of the application

`game-doc` is the folder that will contain your reports (and its pictures) and the user documentation including user-stories, UML, REST, ...

# Ingame images

### Homepage
 ![alt text](game-doc/Sudoku%20first%20page.png)


**Features :**

- Select player name
- Choose level
- Generate random board
- Suggestions option
- Play

### Gameplay
![alt text](game-doc/Sudoku%20second%20page.png)

**Features :**

- Highlight errors
- Undo/Redo
- History tree
- Change player name
- See leaderboard
- Move count
- Enter number from keyboard or click to select the number
- End game and save scores when finish
- Return to homepage by clicking on the Sudoku
