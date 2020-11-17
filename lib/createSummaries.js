import {writeToPath} from './downloadPdfs'
import TmpDirectory from './tmpDirectory';
var pdf = require('html-pdf');

async function createSummaries(applicants){
	const tmp = new TmpDirectory();
	const tmpPath = await tmp.create();
	const tablePath = await buildTable(applicants,tmpPath);
	const applicantPaths = await Promise.all(applicants.map(applicant=>{
		return applicantInfo(applicant, tmpPath);
	}));


	return [tablePath, ...applicantPaths];
}


async function buildTable(applicants, path){
	const table = []
	table
	.push(
		`<tr>
			${Object.keys(applicants).map(key=>{
				return `<th>${key}</th>` 
			}).join('')}
		</tr>`
	);
	table.push(applicants.map(applicant=>{
		return `<tr>
			${Object.keys(applicant).map(key=>{
					return `<td>${applicant[key]}</td>`
				})
			})
			.join('')}
		<tr>`
	}));
	const htmlTopdf = await toPdf(`<html>${table.join('\n')}</html>`);
	return writeToPath(path, htmlTopdf);
}

async function applicantInfo(applicant, path){
	const htmlTopdf = await toPdf(Object.keys(applicant).map(key=>{
		return `<p><strong>${key}</strong>:${applicant[key]}</p>`
	})
	.join('\n'));
	return writeToPath(path, htmlTopdf);
}


async function toPdf(html){
	return pdf.create(html).toBuffer(function(err, buffer){
		return buffer;
	});
}


export default createSummaries;