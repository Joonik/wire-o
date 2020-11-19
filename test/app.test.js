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
          "applicants": [
            {
              "First Name": "Luke Wilcox",
              "Undergraduate University": "Babson College",
              "Expected Undergraduate Graduation Date": "",
              "Edu Email": "lwilcox1@babson.edu",
              "Personal Email": "lukewilcox01@gmail.com",
              "message": "We welcome interns to become a part of our team. You will work with our experts and learn about the industry, our clients and our firm. This is an opportunity to gain valuable insight, develop new skills, and establish a network of mentors and business contacts. You'll leave with a lot more than a job listing on your resume.",
              "Resume": "https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/852\/resume_1.pdf",
              "FMC Level I Certification Number": "290645",
              "FMC Level I Certification Date": "Apr 10, 2018"
            },
            {
              "First Name": "Justin Holt",
              "Undergraduate University": "University of Alabama",
              "Expected Undergraduate Graduation Date": "",
              "Edu Email": "jkholt1@crimson.ua.edu",
              "Personal Email": "jkholt1@crimson.ua.edu",
              "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, architecto ipsam! Sit, earum ducimus dolorum consectetur nemo labore rerum quisquam aliquid, beatae in incidunt commodi. Voluptate necessitatibus iusto doloribus quod.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, architecto ipsam! Sit, earum ducimus dolorum consectetur nemo labore rerum quisquam aliquid, beatae in incidunt commodi. Voluptate necessitatibus iusto doloribus quod.",
              "Resume": "https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7360\/resume_7.pdf",
              "FMC Level I Certification Number": "No Certification",
              "FMC Level I Certification Date": "Apr 10, 2018"
            },
            {
              "First Name": "Andrew Donoghhue",
              "Undergraduate University": "College of New Jersey",
              "Expected Undergraduate Graduation Date": "",
              "Edu Email": "donogha2@tcnj.edu",
              "Personal Email": "",
              "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, maiores eligendi nostrum iusto laudantium necessitatibus aliquid reprehenderit provident quibusdam, tempore delectus sequi? Reiciendis eligendi molestias deleniti blanditiis inventore ipsum earum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, maiores eligendi nostrum iusto laudantium necessitatibus aliquid reprehenderit provident quibusdam, tempore delectus sequi? Reiciendis eligendi molestias deleniti blanditiis inventore ipsum earum!",
              "Resume": "https:\/\/local-adventis.s3.amazonaws.com\/opportunity\/7376\/resume_7.pdf",
              "FMC Level I Certification Number": "No Certification",
              "FMC Level I Certification Date": "Apr 10, 2018"
            },
            {
              "First Name": "Celeste Diaz",
              "Undergraduate University": "DePaul University",
              "Expected Undergraduate Graduation Date": "Jun 2021",
              "Edu Email": "CDIAZ58@depaul.edu",
              "Personal Email": "celestediaz3@gmail.com",
              "message": "Thanks for reporting. If you could provide additional information such as how you're implementing the handler (e.g is it wrapped in a promise?); Which version of Node.js runtime you're using, that might help.",
              "Resume": "https:\/\/local-adventis.s3.amazonaws.com\/users\/7311\/resume.pdf",
              "FMC Level I Certification Number": "No Certification",
              "FMC Level I Certification Date": "Apr 10, 2018"
            },
            {
              "First Name": "Domingo Joaquin",
              "Undergraduate University": "Michigan State University",
              "Expected Undergraduate Graduation Date": "",
              "Edu Email": "dcjoaqu@ilstu.edu",
              "Personal Email": "",
              "message": "Also got this error. I was able to work around it by changing my node version from v8.15 to v8.10. Not exactly the best fix, but it will allow you to get your work done.",
              "Resume": "https:\/\/local-adventis.s3.amazonaws.com\/users\/7285\/resume.pdf",
              "FMC Level I Certification Number": "No Certification",
              "FMC Level I Certification Date": "Apr 10, 2018"
            }
          ],
          "pdfUrls": [
            "https:\/\/local-adventis.s3.amazonaws.com\/https%3A\/\/local-adventis.s3.amazonaws.com\/opportunity\/852\/resume_1.pdf",
            "https:\/\/local-adventis.s3.amazonaws.com\/https%3A\/\/local-adventis.s3.amazonaws.com\/opportunity\/7360\/resume_7.pdf",
            "https:\/\/local-adventis.s3.amazonaws.com\/https%3A\/\/local-adventis.s3.amazonaws.com\/opportunity\/7376\/resume_7.pdf",
            "https:\/\/local-adventis.s3.amazonaws.com\/https%3A\/\/local-adventis.s3.amazonaws.com\/users\/7311\/resume.pdf",
            "https:\/\/local-adventis.s3.amazonaws.com\/https%3A\/\/local-adventis.s3.amazonaws.com\/users\/7285\/resume.pdf"
          ],
          "key":"queen_testing"
        }
          
      
      };

      AWS.S3.prototype.upload = sinon.stub().returns(s3promise);

      ctx.Promise.then(function (response) {
        expect(response["mergedPdf"]).to.equal(expectedUrl);
        done();
      });

      app.handler(params, ctx);
    });
  });
});
