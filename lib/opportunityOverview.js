import toPdf from './toPdf'
/**
 * @param {any} applicants
 * @returns {Promise}
*/
async function opportunityOverview(template){
	console.log(`
	<html>
		<head>
		<meta charset="UTF-8">
		<style>
                .info-card {
                        padding: 25px;
                        margin-bottom: 20px;
                }

                .title__application {
                        margin-bottom: 5px;
                        padding-bottom: 5px;
                        color: #2c627a;
                        font-weight: 600;
                        font-size: 11px;
                        letter-spacing: .3px;
                        border-bottom: 1px solid #000;
                }

                .basic_info {
                        display: flex;
                        flex-wrap: wrap;
                }

                .col-md-6 {
						max-width: 50%;
						border:1px solid black;
						font-size:11px;
                }

                html {
                        padding: 0;
                        margin: 0
                }

                body {
                        padding: 0;
                        margin: 0
                }

                p {
                        font-size: 11px
                }
        </style>
		</head>
		<div style="height:100px;background-color:#fff">
		<img src="https://test-adventis.s3.us-east-2.amazonaws.com/logo_email.png"
				style="float:left;margin:20px 10px 10px 30px" />
		</div>
		${template}
	</html>`)
	return toPdf(`
	<html>
		<head>
		<meta charset="UTF-8">
		<style>
                .info-card {
                        padding: 25px;
                        margin-bottom: 20px;
                }

                .title__application {
                        margin-bottom: 5px;
                        padding-bottom: 5px;
                        color: #2c627a;
                        font-weight: 600;
                        font-size: 11px;
                        letter-spacing: .3px;
                        border-bottom: 1px solid #000;
                }

                .basic_info {
						display: flex;
						flex-direction:row;
						flex-wrap: wrap;
						
                }

                .col-md-6 {
						width: 50%;
						font-size:9px;
                }

                html {
                        padding: 0;
                        margin: 0
                }

                body {
                        padding: 0;
                        margin: 0
                }

                p {
                        font-size: 11px
                }
        </style>
		</head>
		<div style="height:100px;background-color:#fff">
		<img src="https://test-adventis.s3.us-east-2.amazonaws.com/logo_email.png"
				style="float:left;margin:20px 10px 10px 30px" />
		</div>
		${template}
	</html>`)
}


export default opportunityOverview;