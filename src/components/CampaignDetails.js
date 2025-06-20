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
                CampaignId: item.CampaignId,
                gender: item.PersonGenderIdentity || "",      
                name: [item.FirstName, item.LastName]
                  .filter(Boolean)
                  .join(" "),
                firstName: item.FirstName || "",                
                lastName: item.LastName || "",
                phone: item.MobilePhone,      
                email: item.Email || "",
                invited: item.Invited__c || false,                
                RSVP_status: (item.RSVP__c || "").toString(),
                which_day: (item.Which_day__c || "").toString(),
                Number_of_guests: item.Number_of_guests__c?.toString() || "0",
                Name_Of_The_Guest: item.Name_Of_The_Guest__c,
                actions: "true",
              }));
              setMembers(transformedData);              
            }
          },
          payload
        );
      }

    useEffect(() => {
            getCampaignDetails();
        }, []);

        const rsvpOptions = [
            { label: 'Opened', value: 'Opened' },
            { label: 'Closed', value: 'Closed' },
            { label: 'Not Responded', value: 'Not Responded' }
          ];
                   
    
          const invitedOptions = [
            { label: 'Invited', value: true },
            { label: 'Not Invited', value: false }
          ];
          
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    const invitedBodyTemplate = (rowData) => {
        const isInvited = rowData.invited === true;
        return (
          <span style={{ color: isInvited ? 'green' : 'red', fontWeight: '500' }}>
            {isInvited ? 'Invited' : 'Not Invited'}
          </span>
        );
      };
      
    
    const rsvpBodyTemplate = (rowData) => (       
        <div>
          <span style={{ color: rowData.RSVP_status === 'Opened' ? 'green' : 'red', fontWeight: '500' }}>
                    {rowData.RSVP_status}
                  </span>  
        </div>
    );  

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
    const whichDayTemplate = (rowData) => (
        <div style={{ display: 'flex'}}>
            {rowData.which_day}
        </div>
    );
    const NumberOfGuestsTemplate = (rowData) => (
        <div style={{ display: 'flex' }}>
            {rowData.Number_of_guests}
        </div>
    );

    const actionBodyTemplate = (rowData) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/edit-guest" state={{ guest: rowData }}>
            <i className="fa fa-pencil" style={{ color: "maroon", cursor: "pointer" }}></i>
          </Link>
          <i className="fa fa-trash" style={{ color: "red", cursor: "pointer" }}></i>
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
                    {/* <div className="row campaign-details">                                                
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
                    </div> */}
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
                        globalFilterFields={['name', 'email', 'phone', 'RSVP_status', 'which_day', 'Number_of_guests']}
                        filterDisplay="row"
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
                        <Column field="gender" header="" body={genderBodyTemplate} />
                        <Column field="name" header="Campaign Members" body={nameBodyTemplate} />                        
                        {/* <Column field="invited" header="Invited?" body={invitedBodyTemplate} /> */}
                        <Column
                            field="invited"
                            header="Invited?"
                            body={invitedBodyTemplate}
                            dataType="boolean"
                            filter
                            filterMatchMode="equals"
                            showFilterMenu={false}
                            filterElement={(options) => (
                                <Dropdown
                                value={options.value ?? null} // explicitly handle undefined/null
                                options={invitedOptions}
                                onChange={(e) => {
                                    options.filterApplyCallback(e.value);
                                }}
                                placeholder="Select Status"
                                className="p-column-filter"
                                showClear
                                />
                            )}
                            />

                        {/* <Column field="rsvp" header="RSVP Status" style={{ width: '20%' }} body={rsvpBodyTemplate} /> */}
                        <Column field="RSVP_status" header="RSVP Status"
                            style={{ width: '20%' }}
                            body={rsvpBodyTemplate}
                            filter
                            showFilterMenu={false}
                            filterElement={(options) => (
                                <Dropdown
                                    value={options.value}
                                    options={rsvpOptions}
                                    onChange={(e) => options.filterApplyCallback(e.value)}
                                    placeholder="Select RSVP"
                                    className="p-column-filter"
                                    showClear
                                />
                            )}
                        />
                        <Column field="whichDay" header="Which Day" style={{ width: '20%' }} body={whichDayTemplate} />
                        <Column field="noOfGuest" header="Number Of Guest" style={{ width: '25%' }} body={NumberOfGuestsTemplate} />
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