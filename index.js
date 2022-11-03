const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const _ = require("lodash");

const app = express();

app.use(json());
app.get("/flight", (req, res) => {
  const title = ["flight to canada", "flight to japan", "flight to russia", "flight to USA", "flight to germany" ];
  const  time = ["1pm", "3pm", "6pm", "9pm", "11pm"];
  const  price = ["26000", "48000", "27000", "40000", "30000"];
  const date = [ "02-11-22", "04-11-22", "06-11-22", "08-11-22", "09-11-22"];

    res.json({
        title:_.sample(title),
        time:_.sample(time),
        price: _.sample(price),
        date:_.sample(date),

    });
});
app.post("/bookflight", (req, res) =>{
    
});
app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`Flight App listening at http://localhost:${port}`);
});
