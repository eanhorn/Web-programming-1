const people = require('./people');
const axios = require('axios');
async function getCompanies(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data;
}

const listEmployees = async (companyName) => {
    if(companyName === undefined) throw 'companyName must exist'
    if(typeof companyName !== 'string') throw 'companyName must be of type string'
    companyName = companyName.trim();
    if(companyName.length === 0) throw 'companyName must not be empty'
    const companyData = await getCompanies();
    let company = {};
    let found = false;
    for(let i=0;i<companyData.length;i++){
        if(companyData[i]['name'] === companyName){
            company = companyData[i];
            found = true;
            break;
        }
    }
    if(!found){throw `${companyName} was not found`}
    const peopleData = await people.getPeople();
    let Employees = [];
    for(let j=0;j<peopleData.length;j++){
        let currPpl = peopleData[j];
        if(currPpl['company_id'] === company['id']){
            Employees.push({first:currPpl['first_name'], last:currPpl['last_name']});
        }
    }
    Employees = Employees.sort(function (a,b){
        if(a.last<b.last){return -1}
        if(a.last>b.last){return 1}
        return 0;
    });
    let retEmployees = [];
    for(let k=0;k<Employees.length;k++){
        retEmployees.push(`${Employees[k].first} ${Employees[k].last}`);
    }
    company.employees = retEmployees;
    return company;
};

const sameIndustry = async (industry) => {
    if(industry === undefined) throw 'industry must exist'
    if(typeof industry !== 'string') throw 'industry must be of type string'
    industry = industry.trim();
    if(industry.length === 0) throw 'industry must not be empty'
    const data = await getCompanies();
    let companies = [];
    for(let i=0;i<data.length;i++){
        if(data[i]['industry'] === industry){
            companies.push(data[i]);
        }
    }
    if(companies.length === 0){throw `No companies in ${industry} industry`}
    return companies;
};

const getCompanyById = async (id) => {
    if(id === undefined) throw 'id must exist'
    if(typeof id !== 'string') throw 'id must be of type string'
    id = id.trim();
    if(id.length === 0) throw 'id must not be empty'
    const data = await getCompanies();
    for(let i=0;i<data.length;i++){
        if(data[i]['id'] === id){
            return data[i];
        }
    }
    throw 'company not found'
};

module.exports = {
    listEmployees,
    sameIndustry, 
    getCompanyById
};
