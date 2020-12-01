'use strict';

import { expect } from 'chai';
import lambdaContext from 'aws-lambda-mock-context';
import AWS from 'aws-sdk';
import sinon from 'sinon';

import app from '../lib/app';

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
			"opportunity_overview_template": "<div class=\"info-card\">\n\t<h3 class=\"title__application\">Basic Information<\/h3>\n\t<div class=\"row basic_info\">\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Organization<\/strong>\n\t\t\t<p class=\"field-item\">Wells Fargo<\/p>\n\t\t<\/div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Type of Opportunity<\/strong>\n\t\t\t<p class=\"field-item\">Internship Position<\/p>\n\t\t<\/div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Organization Contact Name<\/strong>\n\t\t\t<p class=\"field-item\">Alexandra Lantero<\/p>\n\t\t<\/div>\n\t\t<div class=\"col-md-6\">\n\t\t\t<strong>Organization Contact Email<\/strong>\n\t\t\t<p class=\"field-item\">alantero@sandiego.edu<\/p>\n\t\t<\/div>\n\t<\/div>\n\t<h3 class=\"title__application\">Opportunity Information<\/h3>\n\t\t<div class=\"row basic_info\">\n\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Job Title<\/strong>\n\t\t\t\t\t<p class=\"field-item\">Investment Banking Analyst Program<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Industry<\/strong>\n\t\t\t\t\t<p class=\"field-item\">Private Equity <\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Job Description<\/strong>\n\t\t\t\t\t<p class=\"field-item\">This nine-week program starts with virtual training, followed by five days of classroom instruction on accounting fundamentals, financial modeling, valuation, and Excel. Through hands-on experience and ongoing education, you’ll develop core investment banking skills to help support our clients’ businesses while launching your career in the industry. You’ll benefit from direct exposure on deals and transactions and interact with clients and teams globally.<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Firm Overview<\/strong>\n\t\t\t\t\t<p class=\"field-item\">This nine-week program starts with virtual training, followed by five days of classroom instruction on accounting fundamentals, financial modeling, valuation, and Excel. Through hands-on experience and ongoing education, you’ll develop core investment banking skills to help support our clients’ businesses while launching your career in the industry. You’ll benefit from direct exposure on deals and transactions and interact with clients and teams globally.<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Location<\/strong>\n\t\t\t\t\t<p class=\"field-item\">Melville, NY<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Application Deadline<\/strong>\n\t\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\t\t\t\t\t\t\t\t\tNov 25, 2020\n\t\t\t\t\t\t\t\t\t\t\t<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<strong>Internship Type<\/strong>\n\t\t\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\t\t<span>Spring 2021<\/span>, <span>Fall 2021<\/span>\t\t\t\t\t\t<\/p>\n\t\t\t\t\t<\/div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<strong>Remote\/In-Person<\/strong>\n\t\t\t\t\t<p class=\"field-item\">In-Person<\/p>\n\t\t\t\t<\/div>\n\t\t\t\t\t\t\n\t\t<\/div>\n\t\t\n\t\t<h3 class=\"title__application\">Opportunity Criteria<\/h3>\n\t\t<div class=\"row basic_info\">\n\t\t\t<div class=\"col-md-2\">\n\t\t\t\t<strong>Candidate Type<\/strong>\n\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\tJunior\t\t\t\t\t\n\t\t\t\t<\/p>\n\t\t\t<\/div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<strong>Definition<\/strong>\n\t\t\t\t<p class=\"field-item\">\n\t\t\t\t\tGraduates between Jul 1, 2021 and Jun 30, 2022\n\t\t\t\t<\/p>\n\t\t\t<\/div>\n\t\t\t\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<strong>Certification Requirement<\/strong>\n\t\t\t\t<p class=\"field-item\">FMC Level I Certification<\/p>\n\t\t\t<\/div>\n\t\t<\/div>\n\n\n<\/div>",
			"store": false,
			"opportunity": {
				"id": 3,
				"account": "Wells Fargo",
				"type_of_opportunity": "Internship Position",
				"job_title": "Investment Banking Analyst Program",
				"slug": "investment-banking-analyst-program",
				"application_deadline": "Nov 25,2020",
				"updated_at": "2020-11-13 21:27:39"
			},
			"pdfUrls": [
				"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/852\/resume_3.pdf"
			],
			"applicants": [
				{
					"Full Name": "Luke Wilcox",
					"Undergraduate University": "Babson College",
					"Expected Undergraduate Graduation Date": "May 2021",
					"Edu Email": "lwilcox1@babson.edu",
					"Personal Email": "lukewilcox01@gmail.com",
					"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/lukewilcox01\" target=\"_blannk\">Hyperlink<\/a>",
					"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/852\/resume_3.pdf\">Hyperlink<\/a>",
					"FMC Level I Certification Number": "290645",
					"FMC Level I Certification Date": "Apr 10, 2018",
					"Message": "I value diversity of thought, backgrounds, experiences and perspectives and we’re looking for those who have innovative ideas, entrepreneurial qualities, and enjoy tackling new challenges and solving intellectual problems."
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
