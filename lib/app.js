'use strict';

process.env['PATH'] = `${process.env['PATH']}:${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['LD_LIBRARY_PATH'] = `${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['FONTCONFIG_PATH']  =`${process.env['LAMBDA_TASK_ROOT']}/fonts`
import "regenerator-runtime/runtime";
import 'phantomjs-prebuilt';
import downloadPdfs, { writeToPath } from './downloadPdfs';
import mergePDFs from './mergePdfs';
import uploadToS3 from './uploadToS3';
import storePDF from './storePdf';
import formatResponse from './formatResponse';
import createSummaries from './createSummaries'
import fs from 'fs'
import path from 'path'
import os from 'os'

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
  const summariesPaths  = await createSummaries(applicants);
  const  resumePaths= await downloadPdfs(resumeUrls);
  filePaths.push(...summariesPaths)
  filePaths.push(...resumePaths)
  const buffer = await mergePDFs(filePaths);
  fs.mkdtemp(path.join(os.tmpdir(), 'test-'), function(err, directory){
    writeToPath(directory,buffer)
  })
  return uploadPDF(buffer);
};

exports.handler = (event, context) => {
  console.time("Lambda runtime");

  const merge = mergeUrls(event.body.applicants,event.body.pdfUrls, []);

  merge.then(url => {
    context.succeed(formatResponse(url));
    console.log("Response:", response);
    console.timeEnd("Lambda runtime");
  });


  merge.catch(error => {
    console.log("Something went wrong:", error);
  });
};
