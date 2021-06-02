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
					"opportunity_overview_template": "<div class=\"info-card\">\r\n\t<h3 class=\"title__application\">Basic Information<\/h3>\r\n\t<div class=\"row basic_info\">\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<strong>Organization<\/strong>\r\n\t\t\t<p class=\"field-item\">Credit Agricole Corporate and Investment Bank<\/p>\r\n\t\t<\/div>\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<strong>Type of Opportunity<\/strong>\r\n\t\t\t<p class=\"field-item\">Full-Time Position<\/p>\r\n\t\t<\/div>\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<strong>Organization Contact Name<\/strong>\r\n\t\t\t<p class=\"field-item\">David Lewicki<\/p>\r\n\t\t<\/div>\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<strong>Organization Contact Email<\/strong>\r\n\t\t\t<p class=\"field-item\">david.lewicki@adventiscg.com<\/p>\r\n\t\t<\/div>\r\n\t<\/div>\r\n\t<h3 class=\"title__application\">Opportunity Information<\/h3>\r\n\t\t<div class=\"row basic_info\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Job Title<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\">Associate<\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Industry<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\">Investment Banking <\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Job Description<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\">Crédit Agricole S.A. is a global financial institution based in France with over $2.1 trillion in total assets. The Bank offers a full range of services that include retail banking, corporate & investment banking, asset management, insurance, and numerous others. Crédit Agricole Corporate & Investment Bank (“CA-CIB”), a wholly owned subsidiary, provides capital markets, investment banking, and corporate banking services worldwide.< br \/>\r\n<br \/>\r\nCrédit Agricole Corporate & Investment Bank’s Chicago Office is responsible for executing transactions on behalf of multinational clients headquartered in the U.S.Our clients include public and private companies with a large international presence and annual revenues generally in excess of $1.0 billion.Transactions executed on behalf of clients include but are not limited to strategic and financial advisory, syndicated debt, bond\/equity issuances, foreign exchange \/ interest rate derivatives, securitization, trade finance and structured transactions.<br \/>\r\n<br \/>\r\nOne of the Chicago banking teams (covering agriculture & food, engineering & construction, and diversified) is seeking an experienced hire to assist senior bankers in the management of client relationships. The ideal candidate will demonstrate I) strong initiative and the ability to work well under pressure, II) ability to manage numerous assignments at once, III) resourcefulness and independence, IV) professional demeanor, and V) strong interpersonal and communication skills. In addition, the candidate should have an understanding of finance \/ accounting fundamentals, credit analysis, financial statement analysis, modeling, and valuation.<br \/>\r\n<br \/>\r\nKey Responsibilities<br \/>\r\n<br \/>\r\n• Provide Origination\/Client Coverage support to Senior and Junior Bankers.<br \/>\r\n• Develop an in-depth understanding of the Credit Agricole Group’s product offering and network as well as an understanding of how the Bank’s products and network apply to the Team’s clients and prospects.<br \/>\r\n• Prepare pitch books for client and internal presentations.< br \/>\r\n• Prepare briefing memos for client visits and for internal presentations\/committees.<br \/>\r\n• Prepare financial models and pro forma capital structures for idea generation and client visits.<br \/>\r\n• Learn the fundamentals of financial and strategic analysis.<br \/>\r\n• Maintain global control over revenue budgets for each primary coverage client and support Senior Bankers in managing revenue budgets for all other Team clients.<br \/>\r\n• Develop an in-depth understanding of clients’ and prospects’ strategies and business models.<br \/>\r\n• Manage credit request and approval process for new transactions, amendments and annual reviews.<br \/>\r\n• Liaise with product groups and international counterparts to ensure approvals are received in a timely manner.<br \/>\r\n• Monitor and ensure compliance with all Know Your Customer requirements, internal monitoring requirements, portfolio reviews, etc.<br \/>\r\n• Analyze risk\/return metrics on all stand-alone transactions and client relationships.<br \/>\r\n• Cultivate and upgrade prospect list for future client development.<\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Firm Overview<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\"><\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Location<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\">Chicago, IL<\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Application Deadline<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tFeb 28, 2021\r\n\t\t\t\t\t\t\t\t\t\t\t<\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t\t<strong>Start Date<\/strong>\r\n\t\t\t\t\t\t<p class=\"field-item\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tJul 1, 2021\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<\/p>\r\n\t\t\t\t\t<\/div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t\t<strong>Remote\/In-Person<\/strong>\r\n\t\t\t\t\t<p class=\"field-item\">In-Person<\/p>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t\t\t\r\n\t\t<\/div>\r\n\t\t\r\n\t\t<h3 class=\"title__application\">Opportunity Criteria<\/h3>\r\n\t\t<div class=\"row basic_info\">\r\n\t\t\t<div class=\"col-md-2\">\r\n\t\t\t\t<strong>Candidate Type <\/strong>\r\n\t\t\t\t<p class=\"field-item\">\r\n\t\t\t\t\tSenior\t\t\t\t\t\r\n\t\t\t\t<\/p>\r\n\t\t\t<\/div>\r\n\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t<strong>Definition<\/strong>\r\n\t\t\t\t<p class=\"field-item\">\r\n\t\t\t\t\tGraduates between Jul 1, 2020 and Jun 30, 2021\r\n\t\t\t\t<\/p>\r\n\t\t\t<\/div>\r\n\t\t\t\r\n\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t<strong>Certification Requirement<\/strong>\r\n\t\t\t\t<p class=\"field-item\">FMC Level II Certification<\/p>\r\n\t\t\t<\/div>\r\n\t\t<\/div>\r\n\r\n\r\n<\/div>",
					"store": false,
					"opportunity": {
						"id": 15,
						"account": "Credit Agricole Corporate and Investment Bank",
						"type_of_opportunity": "Full-Time Position",
						"certification_id": 2,
						"job_title": "Associate",
						"slug": "associate",
						"application_deadline": "Feb 28,2021",
						"updated_at": "2021-02-16 17:08:49"
					},
					"pdfUrls": [
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/267\/resume_15.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/6731\/resume_15.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/users\/618\/resume.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7160\/resume_15.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/6349\/resume_15.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/4409\/resume_15.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7455\/resume_15.pdf",
						"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/5960\/resume_15.pdf"
					],
					"applicants": [
						{
							"Full Name": "John (Jack) Adee",
							"Undergraduate University": "Iowa State University",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "jpadee@iastate.edu",
							"Personal Email": "jack.adee@aol.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/jack-adee-6371a0154\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/267\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "May 21, 2018",
							"Message": "I believe I would be a great fit for Credit Agricole as I am Adventis Level I and II certified and have previous investment banking experience. I would love the opportunity to further discuss the position! Thank you for your time."
						},
						{
							"Full Name": "Raven Slim",
							"Undergraduate University": "University of Illinois at Urbana-Champaign",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "rslim2@illinois.edu",
							"Personal Email": "raven.slim@yahoo.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/raven-slim\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/6731\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "Jun 9, 2020",
							"Message": "I would greatly appreciate having the opportunity to be considered for this role. I am driven to learn and have a high level of intellectual curiosity. Along with my qualities, I believe my internship background would go well with the candidate you are seeking."
						},
						{
							"Full Name": "Anthony Mershad",
							"Undergraduate University": "Miami University",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "mershaae@miamioh.edu",
							"Personal Email": "amershad1998@gmail.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/anthony-mershad\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/users\/618\/resume.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "Aug 19, 2019",
							"Message": "Credit Agricole  would provide me with an opportunity in a field that I am very passionate about. I am confident that I can exceed expectations here due to my skillsets and mentality, as I certainly have a good mix of technical and interpersonal skills needed for this position. As for Chicago, Illinois, I have some ties to the area and love the city. This opportunity would be a great kickstart to my career once I graduate and I can promise my full loyalty and dedication to the company. Looking forward to connecting further!"
						},
						{
							"Full Name": "Henry Wayne",
							"Undergraduate University": "University of San Diego",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "henrywayne@sandiego.edu",
							"Personal Email": "henrywayne3599@gmail.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/henry-wayne\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7160\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "Dec 21, 2020",
							"Message": "My name is Henry Wayne and I am a senior on track to graduate magna cum laude this May with a double major in finance and real estate from the University of San Diego. I am very interested in pursuing a career in investment banking and I am seeking more information about potential opportunities at Credit Agricole. What really intrigues me about this position is the ability to grow my skills working at a leading global investment banking, getting great exposure and being able to bring value to the firm. Over the past few years, I have developed a strong passion for banking. Participating in a virtual internship this past summer at a middle market bank called BTIG, I was able to grow this passion and experience how a bank truly operates. I got an understanding of a banker’s work ethic and I believe I have the traits necessary to become one. I am a very quick study who is eager to learn and I am very easy to work with. If given the opportunity, I believe I would be a great addition. I look forward to hearing from you soon. \r\n\r\nBest, \r\nHenry"
						},
						{
							"Full Name": "Grant Aguirre",
							"Undergraduate University": "University of Illinois at Urbana-Champaign",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "gaguir9@illinois.edu",
							"Personal Email": "gea717@gmail.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/gaguir9\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/6349\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 1,
							"FMC Level II Certification Date": null,
							"Message": "Dear Crédit Agricole CIB,\r\nI write to apply for the Associate Opportunity. I graduate in May 2021 from the Gies College of Business at the University of Illinois at Urbana-Champaign. I was introduced to the firm by the Adventis Financial Modelling program where I earned my FMC Level I Certification. \r\nAfter exploring the history of the firm, I see how Crédit Agricole has taken initiative in financing social and environmental projects around the world. This makes me exited to work there after graduation.\r\nI have previously completed an internship at the University of Illinois Foundation endowment. Through this experience I observed how investment managers develop and execute their investment strategies. As an investment banker, I will be better able to understand the needs of investors. I also held an internship at PricewaterhouseCoopers as a START intern which honed my skills in working in a small team environment at a Big 4 accounting firm.\r\nGiven my background in accounting and finance internships, I am a particularly good fit for the Associate Opportunity position at Crédit Agricole. Further, I am impressed by the firm’s ability to pioneer social and environmental change which compels me to hold a fulfilling career there. \r\nI look forward to interviewing with Crédit Agricole CIB. For further communication, please email gaguir9@illinois.edu or call me on my cellphone at (224) 717-9338.\r\nSincerely,\r\nGrant Aguirre"
						},
						{
							"Full Name": "Matthew Lencioni",
							"Undergraduate University": "Bentley University",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "lencion_matt@bentley.edu",
							"Personal Email": "mrlenc7@gmail.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/matthew-lencioni-b2a958156\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/4409\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "Mar 6, 2019",
							"Message": "Hello,\r\n\r\nMy name is Matthew Lencioni and I am a senior student-athlete at Bentley University who received my BS in Corporate Finance & Accounting in December and will obtain my MS in Finance in May 2021. I am looking for a full-time position as an investment banking analyst. Credit Agricole’s commitment to sustainability and providing innovative solutions for clients is impressive and drives my interest in the firm.\r\n\r\nI have attended Adventis' financial modeling boot camp, learning how to build a variety of models such as a three-statement model, public comps, precedent transactions, DCF and an LBO, and earned their Level 2 certification. I have three years of summer internship experience in investment banking, wealth management and accounting. Other strengths of mine include effective teamwork, keen attention to detail, a positive attitude and a strong work ethic.\r\n\r\nAdditional examples of my qualifications are highlighted in my resume.I would love the opportunity to talk with a recruiter to discuss how my skills and interests can meet the goals of Credit Agricole.Please feel free to reach me at 248-977 - 6342."
						},
						{
							"Full Name": "Pablo Gabilondo",
							"Undergraduate University": "University of San Diego",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "pgabilondo@sandiego.edu",
							"Personal Email": "pablogabilondolarrea@hotmail.es",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/gabilondopablo\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7455\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "Feb 22, 2021",
							"Message": "Dear Hiring Manager:\r\n\r\nIt is with great professional enthusiasm that I approach Credit Agricole Corporate and Investment Bank with the goal of exploring entry-level opportunities, such as the Associate opening posted at Aventis. Soon to be equipped with a bachelor’s degree in Business Administration, Minor in Analytics from University of San Diego (expected May 2021), I am well-prepared to align my skill set with any position that requires a proactive individual who strives to exceed expectations on every assignment.\r\n\r\nMy resume is enclosed for your review; highlights include:\r\n\tEfficiently supported finance department by accurately filing, archiving, and updating financial records as Finance Intern for GRUPO GAES.\r\n\tSaved 2% of cash expenditure by administering effective cost control measures and analyzing company’s accounts.\r\n\tBuilt a fully circular, formatted financial model and LBO from scratch, and finalized valuation analysis including public comparables, precedent comparables, and discounted cash flow in fulfillment of requirements for Financial Modeling Certification(FMC).\r\n\r\nIn addition, I possess outstanding time - management skills and work well in team - driven environments.You will find me to be a highly productive individual, quick to grasp essential procedures and protocols, and possessing the stamina to do whatever it takes to complete the task set before me.\r\n\r\nShould these characteristics and a solid work ethic be a good fit with your company, I would look forward to an opportunity to discuss my qualifications in detail.Until then, thank you for your time and consideration.\r\n\r\nSincerely, \r\n\r\nPablo Gabilondo"
						},
						{
							"Full Name": "Patrick Carousso",
							"Undergraduate University": "University of Michigan - Ann Arbor",
							"Expected Undergraduate Graduation Date": "May 2021",
							"Edu Email": "pcar@umich.edu",
							"Personal Email": "phwcarouss0@yahoo.com",
							"LinkedIn": "<a href=\"https:\/\/www.linkedin.com\/in\/patrick-carousso-19a091157\/\" target=\"_blank\">link<\/a>",
							"Resume": "<a href=\"https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/5960\/resume_15.pdf\" target=\"_blank\">resume<\/a>",
							"FMC Certification Level": 2,
							"FMC Level II Certification Date": "Apr 21, 2020",
							"Message": "I believe that I am a great candidate for this position and am excited by the opportunity. My experience crafting a go-to-market strategy for a technology company and working as a venture capital consultant will prove useful for this position. I have the experience of doing deep industry research to find target markets, target customers, classify product types (medical device classification in the case of Metamaterial), navigate regulation processes (FDA clearance process in the case of Metamaterial), and recommend distribution channels. Working as a venture capital consultant also provided me relevant experience, pushing me to think using an investor's mindset when advising Circadian Risk, building its Series A Pitch Deck, and pitching to an investor panel(VC, PE and Angel investors).I have also benefited greatly from my experience in navigating the venture capital investment process and have had exposure to analyzing the factors that inform an investment decision.These experiences will help me make a smooth transition into the work environment and bring immediate value to Credit Agricole."
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
