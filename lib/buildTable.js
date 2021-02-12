import toPdf from './toPdf'
/**
 * Generates table with all applicants
 * @param {any} applicants
 * @returns {Promise<string>}
*/
async function buildTable(applicants, opportunity) {
	const width = (1 / Object.keys(applicants[0]).length) * 100;
	const table = []
	/**
	 * Generates the header of the table. applicants[0] to get the first element's key.
	*/
	table.push(
		`<tr>${Object.keys(applicants[0])
			.map(key => `<th style="width:${width}%;">${key}</th>`).join('')}</tr>`
	);
	table.push(...applicants.map(applicant => {
		return `<tr>${Object.keys(applicant)
			.map(key => `<td style="width:${width}%;">${applicant[key] ? applicant[key] : ''}</td>`).join('')}<tr>`
	})
	);

	return toPdf(`<html>
	<head>
	<meta charset="UTF-8">
	
	<style>
		html{padding:0;margin:0}
		body{padding:0;margin:0}
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
		h5{
			margin: 10px 0 10px 0
		}
	  </style>
	  </head>
	  
	  <div style="height:50px;background-color:#fff">
                <img src="https://test-adventis.s3.us-east-2.amazonaws.com/logo_email.png"
                        style="float:left;margin:20px 10px 10px 0px" />
        </div>
		<h4> ${opportunity?.job_title} - ${opportunity?.type_of_opportunity} - ${opportunity?.application_deadline}</h4>
		<h5>Applicants (${applicants.length})</h5>	
	  <table cellpadding="0" cellspacing="0">${table.join('\n')}</table>
	  </html>`);
}


export default buildTable;