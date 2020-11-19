import toPdf from './toPdf'
/**
 * @param {any} applicants
 * @returns {Promise}
*/
async function buildTable(applicants){
	const table = []
	table
	.push(
		`<tr>${Object.keys(applicants[0])
				.map(key=>{return `<th>${key}</th>`})
				.join('')}</tr>`
	);
	table.push(...applicants.map(applicant=>{
		return `<tr>${Object.keys(applicant)
				.map(key=>{return `<td>${applicant[key]}</td>`})
				.join('')}<tr>`
	})
	);
	return toPdf(`<html>
	<head>
	<meta charset="UTF-8">
	<style>
		table {width: 100%;
			border-collapse: collapse;
			border-radius: 10px;
			font-size: 8px;
			box-shadow: 0 0 20px rgba(0, 0, 0, .3)
        }
		th{
		background-color: #f2f2f2;
		padding:10px;
		
		}
        tr, td, th {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          /*padding: 15px;*/
        }
	  </style>
	  </head>
	  <table>${table.join('\n')}</table>
	  </html>`);
}


export default buildTable;