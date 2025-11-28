import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

import { useState } from "react";

import "./Report.css";

import axios from "axios";

function ReportForm({gameId}) {

    const [selectedReportType, setselectedReportType] = useState();
    const [description, setDescription] = useState("");

    const reportTypeOptions = [
        { label: "Inappropriate Content", value: "INAPP"},
        { label: "Inaccurate Information", value: "INACC"},
        { label: "Malicious", value: "MALIC"},
        { label: "Spam", value: "SPAM"},
        { label: "Other", value: "OTHR"},
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8000/app/reports/report/game/${gameId}/`,
            {report_type: selectedReportType,
            description: description
            },
            {withCredentials: true}
        )
        .then(response => {
            console.log("Report submitted successfully:", response.data);
        })
        .catch(error => {

            console.error("Error submitting report:", error);
        });

    }

    return (
            <form className="report-form" onSubmit={handleSubmit}>
                {/* Elements used from: https://primereact.org*/}
                <Dropdown
                    value={selectedReportType} 
                    placeholder="Select A Report Type" 
                    onChange={(e) => setselectedReportType(e.value)}
                    options={reportTypeOptions}
                    className="report-dropdown"
                    showClear
                />
                <Divider/>
                <InputTextarea
                    placeholder="Give a reason for your report..."
                    rows={7}
                    cols={100}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-field"
                />
                <Divider/>
                <Button label="Submit Report" className="report-button"/>
            </form>
    )
}

export default ReportForm;