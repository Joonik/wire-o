import buildTable from './buildTable'
import applicantInfo from './applicantSummary'

async function createSummaries(applicants){
	const tablePath = await buildTable(applicants);
	const applicantPaths = await Promise.all(applicants.map(applicant=>{
		return applicantInfo(applicant);
	}));
	return [tablePath, ...applicantPaths];
}
export default createSummaries;