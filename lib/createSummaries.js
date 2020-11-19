import buildTable from './buildTable'
import applicantInfo from './applicantSummary'

async function createSummaries(applicants){
	//create a summary table listing applicants
	const tablePath = await buildTable(applicants);
	//Create each student information.
	const applicantPaths = await Promise.all(applicants.map(applicant=>{
		return applicantInfo(applicant);
	}));
	//return the path of temporary files.
	return [tablePath, ...applicantPaths];
}
export default createSummaries;