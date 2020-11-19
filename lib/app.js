'use strict';

process.env['PATH'] = `${process.env['PATH']}:${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['LD_LIBRARY_PATH'] = `${process.env['LAMBDA_TASK_ROOT']}/bin`;
process.env['FONTCONFIG_PATH']  =`${process.env['LAMBDA_TASK_ROOT']}/fonts`
import "regenerator-runtime/runtime";
import 'phantomjs-prebuilt';
import downloadPdfs  from './downloadPdfs';
import mergePDFs from './mergePdfs';
import uploadToS3 from './uploadToS3';
import storePDF from './storePdf';
import createSummaries from './createSummaries'

const bucket = process.env.s3BucketName;
const prefix = 'opportunity/merged';

const storage = uploadToS3({ bucket, prefix });
const uploadPDF = storePDF({ storage });


/**
 * @param {string[]} filePaths A pointer  
 * @param {string[]} applicants 
 * @param {string[]} resumeUrls 
*/
const mergeUrls = async (applicants,resumeUrls, filePaths, key=null) => {
  //Implementation for User Summaries and summary table.
  const summariesPaths  = await createSummaries(applicants);
  //Implementation to concatenate resumes together.
  const  resumePaths= await downloadPdfs(resumeUrls);
  filePaths.push(...summariesPaths)
  filePaths.push(...resumePaths)
  //Array of temporary files uri.
  const buffer= await mergePDFs(filePaths);
  //Implementation to save a copy on s3.
  if(uri)await uploadPDF(buffer, key);
  return buffer;
};

exports.handler = (event, context, callback) => {
  console.time("Lambda runtime");
  
  const merge = mergeUrls(event.body.applicants,event.body.pdfUrls, [], event.body?.key);

  merge.then(buffer => {
    context.succeed({
      headers:{"content-type": "application/pdf"},
      body:buffer.toString('base64'),
      isBase64Encoded:true
    });
    console.log("Response:", response);
    console.timeEnd("Lambda runtime");
  });
  merge.catch(error => {
    console.log("Something went wrong:", error);
  });
};
