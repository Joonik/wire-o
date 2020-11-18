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
          "applicants":[
          
              {
                "name":"daniel Rodriguez Vergara",
                "university":"Boston",
                "graduation_date":"Oct 2019",
                "link":"<a href='https://www.google.com'>Resume link</a>"
              },
              {
                "name":"Jose",
                "university":"Wichita",
                "graduation_date":"Oct 2018",
                "link":"<a href='https://www.google.com'>Resume link</a>"
              },
              {
                "name":"Simon",
                "university":"Texas",
                "graduation_date":"Oct 2017",
                "link":"<a href='https://www.google.com'>Resume link</a>"
              },
              {
                "name":"Rogelio",
                "university":"Miami",
                "graduation_date":"Oct 2010",
                "link":"<a href='https://www.google.com'>Resume link</a>"
              },
              {
                "name":"daniel Rodriguez Vergara",
                "university":"Houston",
                "graduation_date":"Oct 2015",
                "link":"<a href='https://www.google.com'>Resume link</a>"
              }
            ],
                
            "pdfUrls":[
                  "https://local-adventis.s3.amazonaws.com/opportunity/7376/resume_7.pdf",
                  "https://local-adventis.s3.amazonaws.com/opportunity/7360/resume_7.pdf",
                  "https://local-adventis.s3.amazonaws.com/opportunity/852/resume_7.pdf"		
                ]
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
