const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));

const config ={
	format: 'A4', 
	"border": "20px", 
	phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs",
	
}


async function toPdf(html){
	const file = await pdf.createAsync(html, config)
	return file.filename;
}

export default toPdf;