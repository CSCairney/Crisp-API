import PORT from "../Crisp-API/config.js";
import express from "express";

const app = express ();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/status", (req, res) => {
    const status = {
        status: "OK",
        time: new Date()
    }
    res.send(status);
});