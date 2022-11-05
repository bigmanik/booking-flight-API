const fs = require("fs/promises");
const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const _ = require("lodash");
const {v4:uuid} = require("uuid");
const cors = require("cors");


const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));
app.use("/", routes);

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
app.get("/bookflight/,:id", async (req, res) =>{
    const id = req.params.id;
    let content;
    try {
        content = await fs.readFile(`data/bookflight/${id}.txt`, "utf-8");
    } catch (err) {

    }
    res.json({
        content:content
    });
})
app.post("/bookflight", async (req, res) =>{
    const id = uuid();
    const content = req.body.content;

    
    if(!content){
        return res.sendStatus(400);
    }

    await fs.mkdir("data/bookflight", {recursive:true});
    await fs.writeFile(`data/bookflight/${id}.txt`, content);
    res.status(201).json({
        id: id
    });
    
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`Flight App listening at http://localhost:${port}`);
});
