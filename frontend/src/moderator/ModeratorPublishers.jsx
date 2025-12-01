import './Moderator.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Divider } from 'primereact/divider';

import axios from 'axios';
import { InputTextarea } from 'primereact/inputtextarea';


function ModeratorPublishers() {



    return (
    <div className="mod-container">
            <div className="mod-title">
                <h1 className="mod-reports-title">Publisher Requests</h1>
                <Divider></Divider>
                {/* DataTable used from: https://primereact.org/datatable/ */}
                <DataTable value={reports} stripedRows paginator rows={10} showGridlines>
                
                </DataTable>

                <Divider></Divider>

                <Button className="mod-back-button" severity='secondary'>
                    <Link className="mod-back-button-link" to="/moderator/dashboard">Back to Dashboard</Link>
                </Button>;
            </div>
        </div>
    );
}

export default ModeratorPublishers;