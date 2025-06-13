import React, {useState} from "react";
import Header from "../CommonComponents/Header";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import maleIcon from "../Assets/Images/male-icon.png";
import femaleIcon from "../Assets/Images/female-icon.png"
import { Link } from "react-router-dom";


const CampaignDetails = () => {

    const [members, setMembers] = useState([
        {
            gender: 'Female',
            name: 'Smeeta Ghorpade',
            email: 'smeeta.ghorpade@gmail.com',
            phone: '9096357565',
            invited: true,
            rsvp: 'Yes',
            checkedIn: 'Yes',           
            icon: 'pi pi-user'
        },
        {
            gender: 'Male',
            name: 'Shivaji Patil',
            email: 'shivaji.patil@gmail.com',
            phone: '9096357566',
            invited: true,
            rsvp: 'Yes',
            checkedIn: 'Yes',            
            icon: 'pi pi-users'
        },
        {
            gender: 'Male',
            name: 'Milind Nikam',
            email: 'milind.nikam@gmail.com',
            phone: '9096357588',
            invited: false,
            rsvp: 'Yes',
            checkedIn: 'Yes',            
            icon: 'pi pi-users'
        },
        {
            gender: 'Male',
            name: 'Shantanu Kadam',
            email: 'shatanu.kadam@gmail.com',
            phone: '9096357554',
            invited: false,
            rsvp: 'Yes',
            checkedIn: 'Yes',            
            icon: 'pi pi-users'
        },
        {
            gender: 'Male',
            name: 'Amardeep Tayade',
            email: 'amardeep.tayade@gmail.com',
            phone: '9096357590',
            invited: false,
            rsvp: 'Not Responded',
            checkedIn: 'No',            
            icon: 'pi pi-users'
        }
    ]);    

    const rsvpOptions = ['Yes', 'No', 'Not Responded'];
    const checkInOptions = ['Yes', 'No'];
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    // const invitedBodyTemplate = (rowData) => (
    //     <InputSwitch
    //     checked={rowData.invited}
    //     onChange={(e) => onRowEdit(rowData, 'invited', e.value)}
    // />
    // );
    const invitedBodyTemplate = (rowData) => (
        <div>
        <label className="switch">
        <input type="checkbox" id="togBtn" />
        <div className="slider round">
          <span className="on">Yes</span>
          <span className="off">No</span>
        </div>
      </label>
      </div>
    );
    const rsvpBodyTemplate = (rowData) => (
        <Dropdown
            value={rowData.rsvp}
            options={rsvpOptions}
            onChange={(e) => onRowEdit(rowData, 'rsvp', e.value)}
        />
    );

    const checkInBodyTemplate = (rowData) => (
        <Dropdown
            value={rowData.checkedIn}
            options={checkInOptions}
            onChange={(e) => onRowEdit(rowData, 'checkedIn', e.value)}
        />
    );

    const onRowEdit = (rowData, field, value) => {
        const updated = [...members];
        const index = updated.findIndex((m) => m.email === rowData.email);
        updated[index][field] = value;
        setMembers(updated);
    };

    // const tablePaddleTemplate = (rowData) => {
    //     return rowData.table && rowData.paddle
    //         ? `Table: ${rowData.table} Paddle: ${rowData.paddle}`
    //         : 'Not Assigned';
    // };

    const nameBodyTemplate = (rowData) => (
        <span>
            <i className={`${rowData.icon} mr-2`} /> {rowData.name}
        </span>
    );
    const genderBodyTemplate = (rowData) => (
        
          <div style={{ display: 'flex', justifyContent: 'center' }}>                    
            <img
              src={rowData.gender.toLowerCase() === 'male' ? maleIcon : femaleIcon}
              alt={rowData.gender}                      
            />
          </div>       
      
    );

    const actionBodyTemplate = () => (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
           <Link to="/edit-guest"> <i className="fa fa-pencil" style={{ color: 'maroon', cursor: 'pointer' }}></i></Link>
            <i className="fa fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
    );

    return (
        <>
            <Header />
            <div className="campaign-detail-box">
                <div className="mainTitle2">Campaign 1</div>
                <div className="dates">
                    <span className="strongText">Start Date:</span> 06-Jun-2025 &nbsp;&nbsp; <span className="strongText">End Date:</span> 07-Jun-2025
                </div>
                <div className="description2">
                    Campaigns often include financial metrics to assess their effectiveness. This may involve tracking costs, estimated revenue…
                </div>
            </div>
            <div className="mainContentBox">
                <form>
                    <div className="form-group has-search search-box mb30">
                        <span className="fa fa-search form-control-feedback searchIcon" />
                        <input type="text" value={globalFilterValue}
                            onChange={(e) => setGlobalFilterValue(e.target.value)} className="form-control" placeholder="Search contacts by name, email or phone..." />
                    </div>
                    <div className="row campaign-details">
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Guest Type
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>All Type</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    RSVP Status
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>All Status</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Check In
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>All Status</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Invitation
                                </label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>All Status</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row">
                <DataTable value={members}
                className="tableBorder"
                size="small"
                paginator rows={5}
                scrollable
                scrollHeight="400px"              
                globalFilter={globalFilterValue}
                            globalFilterFields={members.map(col => col.name)} // use all field names
                            paginatorTemplate={{
                                layout: 'PrevPageLink PageLinks NextPageLink',
                                PrevPageLink: (options) => (
                                <button
                                    onClick={options.onClick}
                                    disabled={options.disabled}
                                    className="p-paginator-prev"
                                >
                                    Previous
                                </button>
                                ),
                                NextPageLink: (options) => (
                                <button
                                    onClick={options.onClick}
                                    disabled={options.disabled}
                                    className="p-paginator-next"
                                >
                                    Next
                                </button>
                                )
                            }}>
                    <Column field="gender" header="" frozen body={genderBodyTemplate} />
                    <Column field="name" header="Campaign Members" frozen body={nameBodyTemplate} />
                    <Column field="email" header="Email Address" />
                    <Column field="phone" header="Phone Number" />
                    <Column field="invited" header="Invited?" body={invitedBodyTemplate} />
                    <Column field="rsvp" header="RSVP Status" body={rsvpBodyTemplate}  />
                    <Column field="checkedIn" header="Checked In" body={checkInBodyTemplate} />
                    <Column header="Action" body={actionBodyTemplate} />                    
                </DataTable>
                </div>
            </div>
        </>
    );
};
export default CampaignDetails;