const express = require("express");
const { DigitalInput, DigitalOutput } = require("phidget22");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

async function initializePhidgets() {
    try {
        // Create instances
        const redButton = new DigitalInput();
        const greenButton = new DigitalInput();
        const redLED = new DigitalOutput();
        const greenLED = new DigitalOutput();

        // Configure ports
        redButton.setHubPort(0);
        redButton.setIsHubPortDevice(true);

        greenButton.setHubPort(1);
        greenButton.setIsHubPortDevice(true);

        redLED.setHubPort(2);
        redLED.setIsHubPortDevice(true);

        greenLED.setHubPort(3);
        greenLED.setIsHubPortDevice(true);

        // Open connections
        await Promise.all([
            redButton.open(5000),
            greenButton.open(5000),
            redLED.open(5000),
            greenLED.open(5000)
        ]);

        console.log("All Phidget connections opened successfully");

        return { redButton, greenButton, redLED, greenLED };
    } catch (err) {
        console.error("Error initializing Phidgets:", err);
        throw err;
    }
}

let phidgets = null;

// Initialize devices before starting server
initializePhidgets().then(devices => {
    phidgets = devices;
    console.log("Phidget devices initialized successfully");

    // Endpoint for getting button states
    app.get("/button", (req, res) => {
        try {
            if (!phidgets) throw new Error("Phidget devices not initialized");
            const states = {
                redButton: phidgets.redButton.getState(),
                greenButton: phidgets.greenButton.getState()
            };
            res.json(states);
        } catch (err) {
            console.error("Error getting button states:", err);
            res.status(500).json({ error: err.message });
        }
    });

    // Endpoint for controlling LEDs
    app.post("/led", (req, res) => {
        try {
            if (!phidgets) throw new Error("Phidget devices not initialized");
            const { red, green } = req.body;
            phidgets.redLED.setState(red);
            phidgets.greenLED.setState(green);
            res.json({ success: true });
        } catch (err) {
            console.error("Error setting LED states:", err);
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(port, () => {
        console.log(`Phidget server running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to initialize:", err);
    process.exit(1);
});

// Cleanup on exit
process.on('SIGINT', async () => {
    if (phidgets) {
        console.log('Closing Phidget connections...');
        await Promise.all([
            phidgets.redButton.close(),
            phidgets.greenButton.close(),
            phidgets.redLED.close(),
            phidgets.greenLED.close()
        ]);
    }
    process.exit(0);
});
