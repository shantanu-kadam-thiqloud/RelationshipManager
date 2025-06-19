import React, { useState, useEffect } from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import maleIcon from "../Assets/Images/male-icon.png";
import femaleIcon from "../Assets/Images/female-icon.png";
import { Link } from "react-router-dom";
import RestDataSource from "../services/API-request";
import { useLocation } from "react-router-dom";



const CampaignDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const userSessionData = JSON.parse(sessionStorage.getItem("userData"));
    const location = useLocation();
    const campaign = location.state?.campaign;
    const [members, setMembers] = useState(null);

    console.log("Selected Campaign:", campaign);

    const getCampaignDetails = () =>{
        setIsLoading(true);
        const api = new RestDataSource();
      
        const payload = {
            "operation": "campaign members",
            "relationshipmanagerid": userSessionData.Account__c,
            "campaignid": campaign.Id
        };
      
        api.GetCampaignMembers(
          process.env.REACT_APP_API_URL + "/services/apexrest/data",
          (response) => {
            if (response && response.data) {
              const transformedData = response.data.data.map((item) => ({
                id: item.Id,
                gender: item.PersonGenderIdentity || "",
      
                name: [item.FirstName, item.LastName]
                  .filter(Boolean)
                  .join(" "), // Full name with spaces
                firstName: item.FirstName || "",
                //middleName: item.MiddleName || "",
                lastName: item.LastName || "",      
                email: item.Email || "",
                invited: item.Invited__c || "",                
                // status: item.Status__c || "",
                actions: "true",
                //personContactId: item.PersonContactId || "",
              }));
              console.log("API Responses", response.data);
              console.log("transformedData = ",transformedData);
              setMembers(transformedData);              
            }
          },
          payload
        );
      }

    useEffect(() => {
            getCampaignDetails();
        }, []);
    // const [members, setMembers] = useState([
    //     {
    //         gender: 'Female',
    //         name: 'Smeeta Ghorpade',
    //         email: 'smeeta.ghorpade@gmail.com',
    //         phone: '9096357565',
    //         invited: true,
    //         rsvp: 'Yes',
    //         checkedIn: 'Yes',
    //         icon: 'pi pi-user'
    //     },
    //     {
    //         gender: 'Male',
    //         name: 'Shivaji Patil',
    //         email: 'shivaji.patil@gmail.com',
    //         phone: '9096357566',
    //         invited: true,
    //         rsvp: 'Yes',
    //         checkedIn: 'Yes',
    //         icon: 'pi pi-users'
    //     },
    //     {
    //         gender: 'Male',
    //         name: 'Milind Nikam',
    //         email: 'milind.nikam@gmail.com',
    //         phone: '9096357588',
    //         invited: false,
    //         rsvp: 'Yes',
    //         checkedIn: 'Yes',
    //         icon: 'pi pi-users'
    //     },
    //     {
    //         gender: 'Male',
    //         name: 'Shantanu Kadam',
    //         email: 'shatanu.kadam@gmail.com',
    //         phone: '9096357554',
    //         invited: false,
    //         rsvp: 'Yes',
    //         checkedIn: 'Yes',
    //         icon: 'pi pi-users'
    //     },
    //     {
    //         gender: 'Male',
    //         name: 'Amardeep Tayade',
    //         email: 'amardeep.tayade@gmail.com',
    //         phone: '9096357590',
    //         invited: false,
    //         rsvp: 'Not Responded',
    //         checkedIn: 'No',
    //         icon: 'pi pi-users'
    //     }
    // ]);

    const rsvpOptions = ['Yes', 'No', 'Not Responded'];
    const checkInOptions = ['Yes', 'No'];
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    const invitedBodyTemplate = (rowData) => (
        <div>
          <span style={{ color: rowData.invited === true ? 'green' : 'red', fontWeight: '500' }}>
                    {rowData.invited === true ? 'Invited' : 'Not Invited'}
                  </span>  
        </div>
    );
    const rsvpBodyTemplate = (rowData) => (
        // <Dropdown
        //     value={rowData.rsvp}
        //     options={rsvpOptions}
        //     onChange={(e) => onRowEdit(rowData, 'rsvp', e.value)}
        //     style={{ width: '100%', fontSize: '14px !important' }}
        // />
        <div>
          <span style={{ color: rowData.rsvpStatus === true ? 'green' : 'red', fontWeight: '500' }}>
                    {rowData.rsvpStatus === true ? 'Yes' : 'No'}
                  </span>  
        </div>
    );

    // const checkInBodyTemplate = (rowData) => (
    //     <Dropdown
    //         value={rowData.checkedIn}
    //         options={checkInOptions}
    //         onChange={(e) => onRowEdit(rowData, 'checkedIn', e.value)}
    //         style={{ width: '100%', fontSize: '14px' }}

    //     />
    // );

    // const onRowEdit = (rowData, field, value) => {
    //     const updated = [...members];
    //     const index = updated.findIndex((m) => m.email === rowData.email);
    //     updated[index][field] = value;
    //     setMembers(updated);
    // };    

    const nameBodyTemplate = (rowData) => (
        <>
            <div style={{ fontSize: '14px', color: '#333' }}>
                {rowData.name}
            </div>
            <div className="grayText">{rowData.email}</div>
            <div className="grayText">{rowData.phone}</div>
        </>
    );
    const genderBodyTemplate = (rowData) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
                src={rowData.gender.toLowerCase() === 'male' ? maleIcon : femaleIcon}
                alt={rowData.gender}
            />
        </div>
    );
    const dummyTemplate = (rowData) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            
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
                <div className="mainTitle2">{campaign?.Name || 'Campaign Details'}</div>
                <div className="dates">
                    <span className="strongText">Start Date:</span> {campaign?.StartDate || 'N/A'} &nbsp;&nbsp;
                    <span className="strongText">End Date:</span> {campaign?.EndDate || 'N/A'}
                </div>
                <div className="description2">
                    {campaign?.Description || 'No campaign description available.'}
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
                {members && (
                <div className="row">
                    <DataTable value={members}
                        className="tableBorder"
                        size="small"
                        paginator rows={5}
                        scrollable
                        // scrollHeight="400px"              
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
                        <Column field="invited" header="Invited?" body={invitedBodyTemplate} />
                        <Column field="rsvp" header="RSVP Status" style={{ width: '20%' }} body={rsvpBodyTemplate} />
                        <Column field="whichDay" header="Which Day" style={{ width: '20%' }} body={dummyTemplate} />
                        <Column field="noOfGuest" header="Number Of Guest" style={{ width: '25%' }} body={dummyTemplate} />
                        {/* <Column field="checkedIn" header="Checked In" style={{ width: '20%' }} body={checkInBodyTemplate} /> */}
                        <Column header="Action" style={{ textAlign: 'center' }} body={actionBodyTemplate} />
                    </DataTable>
                </div>
                )}
            </div>
            <Footer />
        </>
    );
};
export default CampaignDetails;