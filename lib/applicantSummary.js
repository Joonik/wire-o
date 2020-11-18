import toPdf from './toPdf'


const template = _row =>'<html><head><meta charset="UTF-8"><style>p{font-size:11px}</style></head><body>'
+'<div style="height:100px;background-color:#313341"><img src="https://test-adventis.s3.us-east-2.amazonaws.com/navbar-logo.png" style="float:right" width="100" height="30" /></div>'
+_row
+'</body></html>'



async function applicantInfo(applicant){
	const htmlTopdf = toPdf(template(["<h4>"+applicant.name+" Basic Information</h4>", ...Object.keys(applicant)
										.map(key=>{return row(key, applicant[key])})]
										.join('\n')));
	return htmlTopdf;
}

function row(key, value){
	return `<p><strong>${key}</strong>:${value}</p>`
}

export default applicantInfo;

