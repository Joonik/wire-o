const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));

const config =({format='A4'})=>({
	format: format, 
	"border": "20px", 
	phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs",
})

/**
 * @param {string} html formmated html
 * @returns {string} a Temporal path
*/
async function toPdf(html, settings={}){
	const file = await pdf.createAsync(html, config(settings))
	return file.filename;
}

export default toPdf;