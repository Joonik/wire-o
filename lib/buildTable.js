import toPdf from './toPdf'
/**
 * @param {any} applicants
 * @returns {Promise}
*/
async function buildTable(applicants){
	const width = (1/Object.keys(applicants[0]).length)*100;
	const table = []
	table
	.push(
		`<tr>${Object.keys(applicants[0])
				.map(key=>{return `<th style="width:${width}%;">${key}</th>`})
				.join('')}</tr>`
	);
	table.push(...applicants.map(applicant=>{
		return `<tr>${Object.keys(applicant)
				.map(key=>{return `<td style="width:${width}%;">${applicant[key]}</td>`})
				.join('')}<tr>`
	})
	);
	console.log(`<html>
	<head>
	<meta charset="UTF-8">
	<style>
		table {width: 100%;
			border-collapse: collapse;
			border-radius: 10px;
			font-size: 8px;
			box-shadow: 0 0 20px rgba(0, 0, 0, .3);
        }
		th{
		background-color: #f2f2f2;
		padding:10px;
		
		}
        tr, td, th {
			
          text-align: left;
          border: 1px solid black;
        }
        td {
		  /*padding: 15px;*/
		 
        }
	  </style>
	  </head>
	  <table cellpadding="0" cellspacing="0">${table.join('\n')}</table>
	  </html>`)
	return toPdf(`<html>
	<head>
	<meta charset="UTF-8">
	<style>
		table {width: 100%;
			border-collapse: collapse;
			border-radius: 10px;
			font-size: 8px;
			box-shadow: 0 0 20px rgba(0, 0, 0, .3);
        }
		th{
		background-color: #f2f2f2;
		padding:10px;
		
		}
        tr, td, th {
			
          text-align: left;
          border: 1px solid black;
        }
        td {
		  /*padding: 15px;*/
		 
        }
	  </style>
	  </head>
	  <table cellpadding="0" cellspacing="0">${table.join('\n')}</table>
	  </html>`, {format:'Tabloid'});
}


export default buildTable;