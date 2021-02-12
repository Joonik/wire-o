const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));
process.env.FONTCONFIG_PATH='/var/task/fonts'
const config =({format='A4'})=>({
	format: 'A4', 
	"border": "20px", 
	phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs",
	footer: {
		height: "6mm",
		"contents": {
		  default: '<span style="font-size:7px;color: #444;">Generated on '+(new Date().toUTCString())+' by Adventis &trade;</span>', // fallback value
		}
	  },
})

/**
 * Converts from html to pdf.It has internal settings.
 * @param {string} html formmated html
 * @returns {string} a Temporal path
*/
async function toPdf(html, settings={}){
	const file = await pdf.createAsync(html, config(settings))
	return file.filename;
}

export default toPdf;