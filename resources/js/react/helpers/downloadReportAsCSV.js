import Papa from 'papaparse';

export default function downloadReportAsCSV(report) {
    const clonedReport = Object.assign({}, report);

    const reportData = {
        'fields': ['Target Technology','Included Websites Count'],
        'data': [
            [clonedReport.technology_name,clonedReport.included_websites_count],
        ]
    };

    const technologyName = clonedReport.technology_name;
    const createdDate = clonedReport.created_at;

    //Delete unneccessary data
    delete clonedReport.id;
    delete clonedReport.user_id;
    delete clonedReport.technology_name;
    delete clonedReport.technology_key;
    delete clonedReport.technology_logo_url;
    delete clonedReport.included_websites_count;
    delete clonedReport.created_at;
    delete clonedReport.updated_at;

    const keyWithTitles = {
        included_industries: 'Included Industry Verticals',
        excluded_industries: 'Excluded Industry Verticals',
        included_technologies: 'Included Technologies',
        excluded_technologies: 'Excluded Technologies',
        included_employees_count: 'Included Employees Count',
        excluded_employees_count: 'Excluded Employees Count',
        included_locations: 'Included Locations',
        excluded_locations: 'Excluded Locations',
    };

    for(let key in clonedReport) {
        if(clonedReport[key]) {
            const indexOfTitle = reportData.fields.push(keyWithTitles[key]) - 1;
            JSON.parse(clonedReport[key]).forEach((option, index) => {
                if(typeof option === 'object') {
                    if(option.name) {
                        if(reportData.data[index]) {
                            reportData.data[index][indexOfTitle] = option.name;
                        }else {
                            reportData.data.push([]);
                            reportData.data[index][indexOfTitle] = option.name;
                        };
                    }else {
                        if(reportData.data[index]) {
                            reportData.data[index][indexOfTitle] = `${option.city}, ${option.country}`;
                        }else {
                            reportData.data.push([]);
                            reportData.data[index][indexOfTitle] = `${option.city}, ${option.country}`;
                        };
                    }
                }else {
                    if(reportData.data[index]) {
                        reportData.data[index][indexOfTitle] = option;
                    }else {
                        reportData.data.push([]);
                        reportData.data[index][indexOfTitle] = option;
                    };
                };
            });
        };
    };

    const indexOfTitle = reportData.fields.push('Created Date') - 1;
    reportData.data[0][indexOfTitle] = createdDate;

    const csvString = Papa.unparse(reportData);

    const csvData = new Blob([csvString], {type: 'text/csv;charset=utf-8;'});
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${technologyName} Report.csv`);
    tempLink.click();
}