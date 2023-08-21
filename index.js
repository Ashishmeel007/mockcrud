const express = require("express");
const {connection} = require('./db');
const { userRouter } = require("./routes/userRoute");
const { doctorRouter } = require("./routes/doctorRoute");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users",userRouter);
app.use("/doctors",doctorRouter);

app.listen(8080, async() => {
  try{
    await connection
    console.log('Server started on port 8080');
  } catch(err){
    console.log(err.message)
  }
});
