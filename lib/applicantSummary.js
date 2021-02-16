import toPdf from './toPdf'


/**
 * Generate user's information page with template.
 * @param {string} _row
 * @return {string}
*/
const template = _row => '<html><head><meta charset="UTF-8"><style>html{padding:0;margin:0;font-family: "Roboto", sans-serif;}body{padding:0;margin:0}p{font-size:11px}</style></head>'
	+ ' <div style="height:50px;background-color:#fff"><img src="https://test-adventis.s3.us-east-2.amazonaws.com/logo_email.png" style="float:left;margin:20px 10px 10px 0px" /> </div>'
	+ _row
	+ '</html>'


/**
 * Generate user's information page.
 * @param {any}
 * @return {Promise}
*/
async function applicantInfo(applicant) {
	return toPdf(template(["<h5>Basic Information</h5>", ...Object.keys(applicant)
		.map(key => { return row(key, applicant[key]) })]
		.join('\n')));
}
/**
 * generate each student attribute  in just one row.
 * @param {string} key
 * @param {value} value
 * @return {string}
 * 
*/
const row = (key, value) => `<p style="font-size:11px;"><strong>${key}</strong>: ${value ? nl2br(value) : ''}</p>`;


const nl2br = (str, isXhtml = false) => {
	const breakTag = isXhtml ? '<br />' : '<br>';
	return String(str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};



export default applicantInfo;

