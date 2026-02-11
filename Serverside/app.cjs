const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const EmployeeModel = require("./models/Employee.cjs");
const OpenAI = require("openai");
const axios = require("axios")
const request = require('request');
const path = require("path");
const multer = require("multer");
const FormData = require("form-data")
const formidable = require('formidable')
const {exec} = require('child_process')
const fs = require('fs')
const { log } = require("console");
require('dotenv').config()

console.log(process.env);

const app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
/* REGISTER */
app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body)
     res.json(employee)
    if (employee) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Article Writer
const Textclient = new OpenAI({
  apiKey: process.env.Text_Key,
});

app.post("/api/generate-article", async (req, res) => {
  try {
    const { topic, tone, length, title } = req.body;

    const prompt = `Write a ${length} ${tone} article titled "${title || topic}" about ${topic}.`;

    const response = await Textclient.responses.create({
      model: "gpt-5-nano",
      input: prompt,

    });

    res.json({ text: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

// Background remover 
app.get('/',(req, res)=>{
  res.sendFile(__dirname +"BackgroundRemover.jsx")
})
app.post('/remove-background', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("ERROR PARSING", err);
      return res.status(500).send("Error parsing form");
    }
 let inputfile = files.image
 let outputpath = Date.now() +".jpg"
 let command =`rembg i ${inputfile.filepath} ${outputpath}`
 exec( command,(error, stdout, stderr)=>{
  if (error) {
    console.log(error);
    
  }
  res.download(outputpath,()=>{
    fs.unlinkSync(outputpath)
  })
 })
  });
});

// routes
app.post("/payment", async (req, res) => {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ id: session.id });
  })
  
//mongodb connection 

mongoose
  .connect("mongodb://127.0.0.1:27017/employee")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3001, () =>
      console.log("Server running on http://localhost:3001")
    );
  })
