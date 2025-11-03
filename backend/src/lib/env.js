import "dotenv/config";

export const ENV ={
    PORT: process.env.PORT ,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}



// PORT = 3000
// MONGO_URI = mongodb+srv://prateekkaushik601_db_user:3bcIUAhFiuGgkLA9@cluster0.d3bltav.mongodb.net/chatifydb?appName=Cluster0


// NODE_ENV= development


// JWT_SECRET=myjwtkey

// RESEND_API_KEY= re_iXQP5iaF_6tiAYfLVHkqn2NJaCSq6vri5

// EMAIL_FROM="welcome@your-app.com"
// EMAIL_FROM_NAME="Prateek"

// CLIENT_URL= http://localhost:5173