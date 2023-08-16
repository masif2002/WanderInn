# WanderInn
* A MERN stack application to book hotels and places to stay. 

## Features
* **JWT** Authentication
* Storing user data in **cookies**
* Use of **MongoDB** to store booking data
* **Axios** for API requests
* **TailwindCSS** for styling

## Local Development setup
###  1. Clone the project
```
git clone https://github.com/masif2002/wanderinn
```
### 2. Install dependencies
* Server Side
    ```
    cd server/
    npm install --include=dev
    ```
* Client side
    ```
    cd client/
    npm install 
    ```
### 3. Add Environment Variables
* Create a `.env` file in the `server/` directory with the following environment variables
    ```
    MONGO_CONNECTION_URL
    JWT_SECRET_KEY
    ```
### 4. Add database connection URL 
* [Create a MongoDB Database](https://www.mongodb.com/) for free and add your connnection url in the `.env` file
    ```
    MONGO_CONNECTION_URL=mongodb+srv://yourdbname:yourdbpassword@yourhosteddburl
    JWT_SECRET_KEY=anysecretpassword
    ```
### 5. Launch the development server
* Server Side
    ```
    cd server/
    nodemon index.js
    ```
* Client side
    ```
    cd client/
    npm run dev
    ```


## References
* [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
* [JWT Docs](https://www.npmjs.com/package/jsonwebtoken)
* [React Icons](https://react-icons.github.io/react-icons/)
* [TailwindCSS Docs](https://tailwindcss.com/)

____
If you face any issues during the setup or have any queries regarding the project, feel free to [reach out to me](https://www.linkedin.com/in/masif2002/). Happy to help!
