let express = require('express');

let app = express();

app.get('/user', (req, res) => {
	res.json({name: 'yungjii'})
});

app.listen(4000)
console.log('4000端口')