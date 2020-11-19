import buildTable from './buildTable'
import applicantInfo from './applicantSummary'

async function createSummaries(applicants, opportunity){
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
	return [tablePath, ...applicantPaths];
}
export default createSummaries;