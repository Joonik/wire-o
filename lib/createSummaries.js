import buildTable from './buildTable'
import applicantInfo from './applicantSummary'
import opportunityOverview from './opportunityOverview'
/**
 * @param {string[]} applicants
 * @param {object} opportunity
 * @param {string} template HTML raw string
 * 
*/
async function createSummaries(applicants, opportunity, template){

	//create a page for opportunity overview
	const opportunityOverviewPath =  await opportunityOverview(template)
	//create a page per applicant with individual application information.
	const applicantPaths = await Promise.all(applicants.map(applicant=>{
		return applicantInfo(applicant);
	}));
	//create a summary table listing applicants
	const tablePath = await buildTable(applicants.map(a=>{
		delete a['Message'];
		return a;
	}), opportunity);
	//Create each student information.

	//return the path of temporary files.
	return [opportunityOverviewPath, tablePath, ...applicantPaths];
}
export default createSummaries;