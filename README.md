# Shopping App
* This system contains both front-end and backend. Back-end is located in backend folder.
## Project setup
```
* Go to root level and do `npm install`
* Go to backend folder and do `npm install`
* Start mongo server
```

## Start application
* At root level run `npm run serve`
* Go to /backend folder and run `node server.js`
* For database run mongodb server  
* Note that Backend will run at port 8081

## Features
This app authentication routes like login and register. After user successfully logs in user can view product lists. After that user can perform operations like view, edit and delete. User can also filter products based on name and category.

* User can register itself through username, email and password.
* User can log in using username, email and password
* User gets redirected to dashboard. From where user can click on view products, where it gets redirected to products lists page.
* On products list page, user can see products in grid view. From where user can perform operations on it.
* There's category in side bar where there's list of category.
* On top right corner there's logout button, where user can logout themselves.

## Technologies
* VueJs
* NodeJs
* MongoDb
* Vuetiyfy
