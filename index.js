const express = require('express');
const app = express();

app.get('/', (res, req) => {
    req.send("Hello");
});

app.listen(process.env.PORT || 5000)
