
var mosca = require('mosca')
var nodemailer = require('nodemailer')
var nodemailerConfig = require('./nodemailer.config')

var server = new mosca.Server({
	port: 1883,
	http: {
		port: 1884,
		bundle: true,
		static: './'
	}
})

server.on('clientConnected', function(client) {
	//console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {

	if (packet.topic == "test_email") {
		sendMail()
		console.log(packet.topic)	
	}
		
});

server.on('ready', function() {
	console.log('Mosca server is up and running');
});

function sendMail() {
	var mailer = nodemailer.createTransport(nodemailerConfig.server)
	mailer.sendMail(nodemailerConfig.email)
}