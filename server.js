const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3003
const app = express();
const routes = require('./routes/routes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
})