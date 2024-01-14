const app = require('./app');

const dotenv= require('dotenv');

/** 
 
 *  Handling Uncought Exception
 * ! example console.log(undefinedValue)
 * ? Ye sabse upar likhe ge kyunki agar sabse upar me undefined vlaue hua to cought ker le
*/
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`);

    server.close(()=>{
        process.exit(1);
    });
})
//console.log(vikram);

const connectDatabase = require("./config/database");

// config
dotenv.config({path:"backend/config/config.env"});

// connecting to database

connectDatabase();

const server=app.listen(process.env.PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
// server crash nahi hua hai per koi error aya hai
// aisa error aye to imediately server close kerna hai, hmari bezati na ho!
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
})