const express = require('express');
require('dotenv').config();
const conexao = require('./database/conection');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');



const app = express();
const port = process.env.PORT_EXPRESS || 3020
var server = require('http').createServer(app);

app.use(morgan('[:date[web]] [:response-time ms] [:status] :method :url'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(require('./routes'));

try {
	
	const verificaBanco = async () => {
		let result = await conexao.run('match (n) return n',{});
	};
	
	verificaBanco();

	app.listen(port, async (err) => {
		console.log('Back-end is up on port ' + port);
	});
	
}catch(erro){
	console.log(erro);
};



