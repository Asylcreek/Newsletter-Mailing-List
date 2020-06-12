const express = require("express");
const bodyParser = require("body-parser");
const superAgent = require("superagent");

//Initialize express
app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/////////////////Route controllers
//Home Page Controller
const homePage = (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
};

//Sign up controller
const signup = (req, res) => {
    //Get input from the user
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    //Create an object with the input
    const data = {
        members: [{
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
            email_address: email,
            status: "subscribed",
        }, ],
    };

    //Api authentication
    const listID = "";
    const allocatedServer = ;
    const apiKey = "";

    // Use superagent to post data to MaiChimp api
    superAgent
        .post(`https://us${allocatedServer}.api.mailchimp.com/3.0/lists/${listID}`)
        .send(data) // sends a JSON post body
        .auth("API-Key", apiKey)
        .end((error, response) => {
            if (error || response.statusCode !== 200) {
                return res.sendFile(`${__dirname}/failure.html`);
            };

            res.sendFile(`${__dirname}/success.html`);
        });

};

app.get("/", homePage);

app.post("/", signup);

app.post('/failure', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 4000, () => console.log("Server running on port 4000"));;
