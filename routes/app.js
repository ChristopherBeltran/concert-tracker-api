const express = require("express");
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}

const app = express();

app.use(cors())
app.use(express.json());


app.post('/api/v1/linkedin', async (req, res) => {
    const body = req.body
    try {
        const results = await linkedInRouter(body)
        res.send(results)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = app;