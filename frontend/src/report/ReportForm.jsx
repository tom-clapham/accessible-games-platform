import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

import { useState } from "react";

import "./Report.css";

function ReportForm() {

    const [selectedReportType, setselectedReportType] = useState();

    const reportTypeOptions = [
        { label: "Inappropriate Content", value: "INAPP"},
        { label: "Inaccurate Information", value: "INACC"},
        { label: "Malicious", value: "MALIC"},
        { label: "Spam", value: "SPAM"},
        { label: "Other", value: "OTHR"},
    ]

    return (
            <form className="report-form">
                {/* https://primereact.org/dropdown/ */}
                <Dropdown
                    value={selectedReportType} 
                    placeholder="Select A Report Type" 
                    onChange={(e) => setselectedReportType(e.value)}
                    options={reportTypeOptions}
                    className="report-dropdown"
                />
                <Divider/>
                <InputTextarea
                    placeholder="Give a reason for your report..."
                    rows={7}
                    cols={100}
                    className="text-field"
                />
            </form>
    )
}

export default ReportForm;