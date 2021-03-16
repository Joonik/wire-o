import buildTable from './buildTable'
import applicantInfo from './applicantSummary'
import opportunityOverview from './opportunityOverview'
import { downloadToPath } from './downloadPdfs'

/**
 * Generates a page for opportunity overview, a table and each applicant info  & resume
 * @param {string[]} applicants
 * @param {object} opportunity
 * @param {string} template HTML raw string
 * 
*/
async function createSummaries(applicants, opportunity, template, pdfUrls) {

	//create a page for opportunity overview
	const opportunityOverviewPath = await opportunityOverview(template)
	//create a page per applicant with individual application information.
	const applicantPaths = []
	for (let [index, applicant] of applicants.entries()) {

		applicantPaths.push(...await Promise.all([applicantInfo(applicant), applicant.Resume ? downloadToPath(pdfUrls[index]) : null]));
	}
	//create a summary table listing applicants
	const tablePath = await buildTable(applicants.filter(a => {
		delete a['Message'];
		delete a['Edu Email'];
		delete a['Personal Email'];
		return a;
	}), opportunity);
	//return the path of temporary files.
	return [tablePath, opportunityOverviewPath, ...applicantPaths];
}
export default createSummaries;