'use strict';

import { expect } from 'chai';
import lambdaContext from 'aws-lambda-mock-context';
import AWS from 'aws-sdk';
import sinon from 'sinon';

import app from '../lib/app';
//npm run test --grep test/app.test.js

describe('app', function () {
	context('with valid pdf URLS', function () {
		it('should merge a set of PDFs', function (done) {
			const expectedUrl = 'https://s3.amazonaws.com/superglue/foo.pdf';
			const ctx = lambdaContext();
			const s3promise = {
				promise: function () {
					return new Promise(function (resolve, _) {
						return resolve({ Location: 'https://s3.amazonaws.com/superglue/foo.pdf' });
					})
				}
			};

			const params = {
				body: {
					"opportunity_overview_template": "<div class=\"info-card\">\n\t<h3 class=\"title__application\">Basic Information<\/h3>\n\t<div class=\"row basic_info\">\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Organization<\/strong>\n\t\t\t<p class=\"field-item\">Wells Fargo<\/p>\n\t\t<\/div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Type of Opportunity<\/strong>\n\t\t\t<p class=\"field-item\">Internship Position<\/p>\n\t\t<\/div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Organization Contact Name<\/strong>\n\t\t\t<p class=\"field-item\">Alexandra Lantero<\/p>\n\t\t<\/div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Organization Contact Email<\/strong>\n\t\t\t<p class=\"field-item\">alantero@sandiego.edu<\/p>\n\t\t<\/div>\n\t<\/div>\n\t<h3 class=\"title__application\">Opportunity Information<\/h3>\n\t\t<div class=\"row basic_info\">\n\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Job Title<\/strong>\n\t\t\t\t\t<p class=\"field-item\">Testing Appplication<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Industry<\/strong>\n\t\t\t\t\t<p class=\"field-item\">Wealth Management <\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Job Description<\/strong>\n\t\t\t\t\t<p class=\"field-item\">J.P. Morgan is a global leader in financial services, offering solutions to the world's most important corporations, governments and institutions in more than 100 countries. As announced in early 2018, JPMorgan Chase will deploy $1.75 billion in philanthropic capital around the world by 2023. We also lead volunteer service activities for employees in local communities by utilizing our many resources, including those that stem from access to capital, economies of scale, global reach and expertise.<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Firm Overview<\/strong>\n\t\t\t\t\t<p class=\"field-item\">J.P. Morgan is a global leader in financial services, offering solutions to the world's most important corporations, governments and institutions in more than 100 countries. As announced in early 2018, JPMorgan Chase will deploy $1.75 billion in philanthropic capital around the world by 2023. We also lead volunteer service activities for employees in local communities by utilizing our many resources, including those that stem from access to capital, economies of scale, global reach and expertise.<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Location<\/strong>\n\t\t\t\t\t<p class=\"field-item\">New York City, NY<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Application Deadline<\/strong>\n\t\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\t\t\t\t\t\t\t\t\tNov 30, 2020\n\t\t\t\t\t\t\t\t\t\t\t<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<strong>Internship Type<\/strong>\n\t\t\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\t\t<span>Summer 2021<\/span>, <span>Winter 2021<\/span>, <span>Spring 2022<\/span>\t\t\t\t\t\t<\/p>\n\t\t\t\t\t<\/div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Remote\/In-Person<\/strong>\n\t\t\t\t\t<p class=\"field-item\">In-Person<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t\t\t\n\t\t<\/div>\n\t\t\n\t\t<h3 class=\"title__application\">Opportunity Criteria<\/h3>\n\t\t<div class=\"row basic_info\">\n\t\t\t<div class=\"col-md-2\">\n\t\t\t\t<strong>Candidate Type<\/strong>\n\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\tSophomore\t\t\t\t\t\n\t\t\t\t<\/p>\n\t\t\t<\/div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<strong>Definition<\/strong>\n\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\tGraduates between Jul 1, 2022 and Jun 30, 2023\n\t\t\t\t<\/p>\n\t\t\t<\/div>\n\t\t\t\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<strong>Certification Requirement<\/strong>\n\t\t\t\t<p class=\"field-item\">FMC Level I Certification<\/p>\n\t\t\t<\/div>\n\t\t<\/div>\n\n\n<\/div>",
					"store": false,
					"opportunity": {
						"id": 7,
						"account": "Wells Fargo",
						"type_of_opportunity": "Internship Position",
						"job_title": "Testing Appplication",
						"slug": "testing-appplication",
						"application_deadline": "Nov 30,2020",
						"updated_at": "2020-11-15 05:12:19"
					},
					"pdfUrls": [
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/852\/resume_7.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7360\/resume_7.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7376\/resume_7.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/users\/7311\/resume.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/users\/7285\/resume.pdf"
					],
					"applicants": [
						{
							"Full Name": "Luke Wilcox",
							"Undergraduate University": "Babson College",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "lwilcox1@babson.edu",
							"Personal Email": "lukewilcox01@gmail.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/lukewilcox01\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/852\/resume_7.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Level I Certification Date": "Apr 10, 2018",
							"Message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
						},
						{
							"Full Name": "Justin Holt",
							"Undergraduate University": "University of Alabama",
							"Expected Undergraduate Graduation Date": "May 2022",
							"Edu Email": "jkholt1@crimson.ua.edu",
							"Personal Email": "jkholt1@crimson.ua.edu",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/daniel-rodriguez-ab3607165\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7360\/resume_7.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Level I Certification Date": null,
							"Message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, architecto ipsam! Sit, earum ducimus dolorum consectetur nemo labore rerum quisquam aliquid, beatae in incidunt commodi. Voluptate necessitatibus iusto doloribus quod.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, architecto ipsam! Sit, earum ducimus dolorum consectetur nemo labore rerum quisquam aliquid, beatae in incidunt commodi. Voluptate necessitatibus iusto doloribus quod."
						},
						{
							"Full Name": "Andrew Donoghhue",
							"Undergraduate University": "College of New Jersey",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "donogha2@tcnj.edu",
							"Personal Email": "",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/andrew-donoghue-895858174\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7376\/resume_7.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Level I Certification Date": null,
							"Message": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, maiores eligendi nostrum iusto laudantium necessitatibus aliquid reprehenderit provident quibusdam, tempore delectus sequi? Reiciendis eligendi molestias deleniti blanditiis inventore ipsum earum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, maiores eligendi nostrum iusto laudantium necessitatibus aliquid reprehenderit provident quibusdam, tempore delectus sequi? Reiciendis eligendi molestias deleniti blanditiis inventore ipsum earum!"
						},
						{
							"Full Name": "Celeste Diaz",
							"Undergraduate University": "DePaul University",
							"Expected Undergraduate Graduation Date": "Aug 2020",
							"Edu Email": "CDIAZ58@depaul.edu",
							"Personal Email": "celestediaz3@gmail.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/daniel-rodriguez-ab3607165\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/users\/7311\/resume.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Level I Certification Date": null,
							"Message": "Thanks for reporting. If you could provide additional information such as how you're implementing the handler (e.g is it wrapped in a promise?); Which version of Node.js runtime you're using, that might help."
						},
						{
							"Full Name": "Domingo Joaquin",
							"Undergraduate University": "Michigan State University",
							"Expected Undergraduate Graduation Date": "May 1996",
							"Edu Email": "dcjoaqu@ilstu.edu",
							"Personal Email": "",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/daniel-rodriguez-ab3607165\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/users\/7285\/resume.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Level I Certification Date": null,
							"Message": "Also got this error. I was able to work around it by changing my node version from v8.15 to v8.10. Not exactly the best fix, but it will allow you to get your work done."
						}
					]
				}
			}

			AWS.S3.prototype.upload = sinon.stub().returns(s3promise);

			ctx.Promise.then(function (response) {
				expect(response["mergedPdf"]).to.equal(expectedUrl);
				done();
			});

			app.handler(params, ctx);
		});
	});
});
