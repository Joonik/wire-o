//@ts-check
'use strict';

process.env['PATH'] = `${process.env['PATH']}:${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['LD_LIBRARY_PATH'] = `${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['FONTCONFIG_PATH']  =`${process.env['LAMBDA_TASK_ROOT']}/fonts`
import "regenerator-runtime/runtime";
import 'phantomjs-prebuilt';
import downloadPdfs, { writeToPath }  from './downloadPdfs';
import mergePDFs from './mergePdfs';
import uploadToS3 from './uploadToS3';
import storePDF from './storePdf';
import createSummaries from './createSummaries'
import os from 'os'
import fs from 'fs'
import path from 'path'
const bucket = process.env.s3BucketName;
const prefix = 'opportunity/merged';

const storage = uploadToS3({ bucket, prefix });
const uploadPDF = storePDF({ storage });


/**
 * @param {string[]} filePaths A pointer  
 * @param {*[]} applicants applicant information
 * @param {string[]} resumeUrls resumes urls 
 * @param {string} template opportunity overview as raw HTML
 * @param {boolean} store store the pdf generate on s3
 * @returns {Promise<Buffer>}
*/
const mergeUrls = async (applicants,resumeUrls,opportunity,template, store, filePaths) => {
  //Implementation to create opportunity info page
  //Implementation for User Summaries and summary table.
  const summariesPaths  = await createSummaries(applicants, opportunity, template);
  //Implementation to concatenate resumes together.
  const  resumePaths= await downloadPdfs(resumeUrls);
  filePaths.push(...summariesPaths)
  filePaths.push(...resumePaths)
  //Array of temporary files uri.
  const buffer= await mergePDFs(filePaths);
  fs.mkdtemp(path.join(os.tmpdir(), 'test-'), function(err, directory){
    writeToPath(directory,buffer)
  });
  //Implementation to save a copy on s3.
  if(store)await uploadPDF(buffer, `${opportunity?.slug}-000${opportunity.id}`);
  return buffer;
};

exports.handler = (event, context, callback) => {
  console.time("Lambda runtime");
  
  const merge = mergeUrls(
    event.body.applicants,
    event.body.pdfUrls,
    event.body.opportunity,
    event.body.opportunity_overview_template,
    event.body?.store, 
    []
     );

  merge.then(buffer => {
    context.succeed({
      headers:{"content-type": "application/pdf"},
      body:buffer.toString('base64'),
      isBase64Encoded:true
    });
    console.timeEnd("Lambda runtime");
  });
  merge.catch(error => {
    console.log("Something went wrong:", error);
  });
};
