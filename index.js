const path = require('path');
const express = require('express');
const app = express();

// parse Form DATA
app.use(express.json());

// set static folder
app.use(
    express.static(path.join(__dirname, 'public'))
);

app.post('/pay', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is up on port ${PORT}`);
});