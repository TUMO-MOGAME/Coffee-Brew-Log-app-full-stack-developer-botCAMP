i used describe the application i wanted to buid to ChatGPT and based on the description it gave me the following suggestion of the following tools to use for this project

vite
react
tailwind
typescript
shaden ui
is started with vite from freeCodeCamp.org course by @khattakder

devided my project into small tasks for 5 days

Plan
Day 1
plan data model Brew: id: number coffeetype: string brewmethod: string brewtime: string notes: string created_at: datetime

list all crud operations

create a brew read all brews read a brew update a brew delete a brew

backend setup initialize nodes.js project setup typescript config creat basic express server setup database with brews table

note ------ learnt that the main reason we build backend first so that even if UI is not fully ready having endpoints ready lets frontend development hit real instance of the database and get data from it and not fake data
Day 2 Building backend crud
goal: complete fully functional api

1 routes and controllers get /api/brews - get all brews post /api/brews -add to a new brew get /api/brew/:id - get one brew post /api/brew/:id - update a brew delete /api/brew/:id - delete a brew

2 validation check all the fields exist on post/put return appropriate http status codes (200,201,400,404,500)

3 test endpoints use postman to test all endpoints make sure db persists changes

Day 3 frontend setup
goal: prepare react project and basic components

1 initialize react project 2 setup tailwind css add tailwind.config.js and base styles

3 create folder structure components pages utils styles types app.tsx index.tsx

4 api service crea services/api.ts using axios to connect to my backend

Day 4 connect frontend to backend
goal: make the app fully functional

1 brew list component fetch/api/brews in brewlist and display them include total brews count

2 creat brew from validation prevent empty fields post to /api/brews redirrect to list after success

3 edit bew populate form with existing brew data put updated data to /api/brew/:id

4 delete brew call delete /api/brew/:id on button click update frontend list dynamically

5 optional: filter brews by method

Day 5 polish and deploy
goal: make the app look good and deploy it

1 improve ui use tailwind to style components add animations and transitions

2 test test all crud operations ensure validation works

3 deploy deploy frontend to vercel update api url, in frontend to point to deployed backend
 