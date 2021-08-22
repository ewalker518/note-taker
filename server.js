const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db')
const express = require('express');
const PORT = process.env.PORT || 3003
const app = express();
const routes = require('./routes/routes');

app.use(express.static(__dirname));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
})