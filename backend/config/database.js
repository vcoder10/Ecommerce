// const mongoose = require("mongoose");

// const connectDatabase = () => {
//     mongoose
//       .connect(process.env.DB_URI, {
//         useNewUrlParser: true,    // ye sab ab work nahi kerta
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//       })
//       .then((data) => {
//         console.log(`Mongodb connected with server: ${data.connection.host}`);
//       }).catch((err)=>{
//         console.log(err)
//       })
//   };
  
//   module.exports = connectDatabase;

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
    
};

module.exports = connectDatabase;

  