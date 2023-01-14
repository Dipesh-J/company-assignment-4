const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const route = require('./src/route/route')
const app = express();

app.use(express.json());
app.use(multer().any())

// Connect to MongoDB
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/company-assignment-4', { useNewUrlParser: true })
.then(()=> console.log('Connected to MongoDB'))
.catch((err)=> console.log(err))

app.use('/',route)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
