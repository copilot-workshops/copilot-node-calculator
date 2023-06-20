const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const routes = require("./api/routes");
routes(app);

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
