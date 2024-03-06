const http = require('https');

const options = {
	method: 'POST',
	hostname: 'swift-translate.p.rapidapi.com',
	port: null,
	path: '/translate',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'tM4exI1zSUmshrxj6bzXU2YXbbwep1zoQgFjsno4EHvzvAdHZc',
		'X-RapidAPI-Host': 'swift-translate.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(JSON.stringify({
  text: 'The book is on the table',
  sourceLang: 'en',
  targetLang: 'pt'
}));
req.end();