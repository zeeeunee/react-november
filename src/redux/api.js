const path = process.env.PUBLIC_URL;

const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};
