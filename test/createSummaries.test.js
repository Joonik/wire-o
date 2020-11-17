'use strict';

import { expect } from 'chai';
import createSummaries from '../lib/createSummaries';

describe('createSummaries module', function () {
  it('returns an array of path names', function (done) {
    //const urls = ["https://s3.amazonaws.com/superglue/PCAH_PDF_TEMPLATE.pdf"];
	const applicants =[
		{
			name:'daniel Rodriguez Vergara',
			university:"Boston",
			graduation_date:'Oct 2019'
		},
		{
			name:'Jose',
			university:"Wichita",
			graduation_date:'Oct 2018'
		},
		{
			name:'Simon',
			university:"Texas",
			graduation_date:'Oct 2017'
		},
		{
			name:'Rogelio',
			university:"Miami",
			graduation_date:'Oct 2010'
		},
		{
			name:'daniel Rodriguez Vergara',
			university:"Houston",
			graduation_date:'Oct 2015'
		}

	]
	const expectedFilePathPattern = /\/tmp\/.+\/.+.pdf/;

    createSummaries(applicants)
      .then(function (filepaths) {
        filepaths.forEach(function (path) {
          expect(path).to.match(expectedFilePathPattern);
        });

        done();
      });
  });
 });