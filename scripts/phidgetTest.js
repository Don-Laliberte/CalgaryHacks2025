const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 5000;

app.get("/button", (req, res) => {
    console.log("Button state requested");
    res.json({
        redButton: false,
        greenButton: false
    });
});

app.post("/led", (req, res) => {
    console.log("LED state change requested");
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
    console.log(`Try accessing http://localhost:${port}/button in your browser`);
}); 