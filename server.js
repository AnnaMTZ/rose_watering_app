const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const PORT = process.env.PORT || 8003;

//Middleware
app.use(express.static('public'));
app.use(express.json());
//

//Renders html page 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactform.html')
});

//Handling POST request from app.js

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'annamikhailenko@gmail.com',
            pass: 'Mijn1gmail!'
        }
    });


    const mailOptions = {
        from: req.body.email,
        to: 'annamikhailenko@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`, 
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});