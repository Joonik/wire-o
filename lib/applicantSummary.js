import toPdf from './toPdf'


const template = _row =>'<html><head><meta charset="UTF-8"><style>html{padding:0;margin:0}body{padding:0;margin:0}p{font-size:11px}</style></head>'
+'<div style="height:100px;background-color:#313341"><img src="https://test-adventis.s3.us-east-2.amazonaws.com/navbar-logo.png" style="float:right;margin:10px 10px 0 0"/></div>'
+_row
+'</html>'


/**
 * @param {any}
 * @return {Promise}
*/
async function applicantInfo(applicant){
	return toPdf(template(["<h5>Basic Information</h5>", ...Object.keys(applicant)
										.map(key=>{return row(key, applicant[key])})]
										.join('\n')));
}

function row(key, value){
	return `<p style="font-size:11px;"><strong>${key}</strong>:${value}</p>`
}

export default applicantInfo;

