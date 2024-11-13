const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const videoRoute = require("./routes/videos");
const cors = require("cors")

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options = {
    origin: ['*', 'https://cinesatchel-com-full.vercel.app'],
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    allowedHeaders: ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'token']
}
app.use(cors(options));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server started");
});
