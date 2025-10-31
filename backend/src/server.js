import express from 'express';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import path from "path";
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';





const app= express();
const ___dirname = path.resolve();


const PORT=ENV.PORT|| 3000;


app.use(express.json()); //req.body


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if(ENV.NODE_ENV === "production")
{
    app.use(express.static(path.join(___dirname, "../frontend/dist")));
    app.get(/.* /,(req,res) => {
        res.sendFile(path.join(___dirname,"../frontend","dist","index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port : "+ PORT)
    connectDB();
});


