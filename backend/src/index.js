import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import router from './Router/auth.router.js';
 
dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use("/api/users", router)
connectDB().then(() => {
    app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
}).catch((err) => {
    console.error('Failed to connect to the database', err);
})
