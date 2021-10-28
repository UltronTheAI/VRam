const express = require('express');
const app = express();

app.get('/', (res, req) => {
    req.send("wellcome");
});

app.listen(process.env.PORT || 5000)
