'use strict';

process.env['PATH'] = `${process.env['PATH']}:${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['LD_LIBRARY_PATH'] = `${process.env['LAMBDA_TASK_ROOT']}/bin`;

import "regenerator-runtime/runtime";

import downloadPdfs from './downloadPdfs';
import mergePDFs from './mergePdfs';
import uploadToS3 from './uploadToS3';
import storePDF from './storePdf';
import formatResponse from './formatResponse';

const bucket = process.env.s3BucketName;
const prefix = 'merged';

const storage = uploadToS3({ bucket, prefix });
const uploadPDF = storePDF({ storage });


/**
 * @param {string[]} filePaths A pointer  
 * @param {string[]} applicants 
 * @param {string[]} resumeUrls 
*/
const mergeUrls = async (applicants,resumeUrls, filePaths) => {
  //const summariesPaths  = await createSummaries(applicants);
  const  resumePaths= await downloadPdfs(resumeUrls);
  
  filePaths
  .push(summariesPaths)
  .push(resumePaths)

  const buffer = await mergePDFs(filePaths);
  return uploadPDF(buffer);
};

exports.handler = (event, context) => {
  console.time("Lambda runtime");

  const merge = mergeUrls(event.body.pdfUrls);

  merge.then(url => {
    context.succeed(formatResponse(url));
    console.log("Response:", response);
    console.timeEnd("Lambda runtime");
  });

  merge.catch(error => {
    console.log("Something went wrong:", error);
  });
};
