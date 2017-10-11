const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send({ hi: 'there!!!' });
});

// deplouing with heroku.com
const PORT = process.env.PORT || 5000;
app.listen(PORT) ;
