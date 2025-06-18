import React, { useState, useEffect } from "react";
import RestDataSource from "../services/API-request";
import AddToCampaignModal from "./AddToCampaignModal";
import EditContactModal from "./EditContactModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";
import maleIcon from "../Assets/Images/male-icon.png";
import femaleIcon from "../Assets/Images/female-icon.png"
import Spinner from "../CommonComponents/Spinner";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const sampleContacts = [
  {
    gender: "Female",
    name: "Smeeta Ghorpade",
    email: "smeeta.ghorpade@gmail.com",
    phone: "9096357565",
    city: "Pune",
    status: "Active",    
    actions: "true"
  },
  {
    gender: "Male",
    name: "Shivaji Patil",
    email: "shivaji.patil@gmail.com",
    phone: "9096357566",
    city: "Mumbai",
    status: "Active",    
    actions: "true"
  },
  {
    gender: "Male",
    name: "Milind Nikam",
    email: "milind.nikam@gmail.com",
    phone: "9096357588",
    city: "Nagpur",
    status: "Active",    
  },
  {
    gender: "Male",
    name: "Shantanu Kadam",
    email: "shantanu.kadam@gmail.com",
    phone: "9096357554",
    city: "Kolhapur",
    status: "Active",    
  },
  {
    gender: "Male",
    name: "Amardeep Tayade",
    email: "amardeep.tayade@gmail.com",
    phone: "9096357590",
    city: "Nashik",
    status: "Inactive"    
  },
  {
    gender: "Female",
    name: "Rutuja Chinchwade",
    email: "rutuja.chinchwade@gmail.com",
    phone: "9096357565",
    city: "Pune",
    status: "Active",    
  }
];


const Contacts = () => {
    const [contacts, setContacts] = useState([]);
      const [columns, setColumns] = useState([]);
      const [selectedItem, setSelectedItem] = useState(null);
      const [showCampaginModal, setShowCampaginModal] = useState(false);
      const [globalFilterValue, setGlobalFilterValue] = useState('');
      const [showEditModal, setShowEditModal] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [selectedRow, setSelectedRow] = useState([]);
      const userSessionData = JSON.parse(sessionStorage.getItem("userData"));
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [selectedContact, setSelectedContact] = useState(null);
    
      const handleAddContact = (newContact) => {
        setContacts((prev) => [...prev, newContact]);
      };

      useEffect(() => {
        getContactList();
    }, []);

      const getContactList = () =>{
        setIsLoading(true);
        const api = new RestDataSource();
      
        const payload = {
          operation: "get contacts under rm",
          personid: userSessionData.Account__c
        };
      
        api.PostData(
          process.env.REACT_APP_API_URL + "/services/apexrest/data",
          (response) => {
            if (response && response.data) {
              const transformedData = response.data.data.map((item) => ({
                id: item.Id,
                gender: item.PersonGenderIdentity || "",
      
                name: [item.FirstName, item.MiddleName, item.LastName]
                  .filter(Boolean)
                  .join(" "), // Full name with spaces
                firstName: item.FirstName || "",
                middleName: item.MiddleName || "",
                lastName: item.LastName || "",      
                email: item.Email__c || "",
                phone: item.PersonMobilePhone || "",
                city: item.PersonMailingCity || "",
                status: item.Status__c || "",
                actions: "true",
                personContactId: item.PersonContactId || "",
              }));
      
              setContacts(transformedData);
              generateColumns(transformedData);
            }
          },
          payload
        );
      }
      
      // Generate columns from object keys
      const generateColumns = (data) => {
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key,value) => {
            // Status column
            if (key === "status") {
              return {
                field: key,
                header: "Status",
                sortable: true,
                sortIcon: <i className="fa fa-angle-up" />,
                unsortIcon: <i className="fa fa-angle-down" />,
                body: (rowData) => (
                  <span style={{ color: rowData.status === 'Active' ? 'green' : 'red', fontWeight: '500' }}>
                    {rowData.status}
                  </span>
                ),
              };
            }
      
            // Actions column (no sorting)
            if (key === "actions") {
              return {
                field: key,
                header: "Action",
                body: (rowData) => (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <i className="fa fa-pencil" onClick={() => {
                      setSelectedRow(rowData);
                      setShowEditModal(true);
                    }} style={{ color: 'maroon', cursor: 'pointer' }}></i>
                    <i className="fa fa-trash" onClick={()=>{
                      handleDeleteClick(rowData)
                    }} style={{ color: 'red', cursor: 'pointer' }}></i>
                  </div>
                ),
              };
            }
            if (key === 'gender') {
              return {
                field: key,
                header: "",
                body: (rowData) => (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>                    
                    <img
                      src={rowData.gender.toLowerCase() === 'female' ? femaleIcon : maleIcon}
                      alt={rowData.gender}                      
                    />
                  </div>
                ),
              };
            }
            const hiddenKeys = ["firstName", "middleName", "lastName", "id", "personContactId"];
            if (hiddenKeys.includes(key)) return null;
            // Default sortable column with custom sort icons
            return {
              field: key,
              header: key.charAt(0).toUpperCase() + key.slice(1),
              sortable: true,          
            };
          });
          setColumns(cols.filter(Boolean)); 
          //setColumns(cols);
          setIsLoading(false);
        }
      };
     
      const handleConfirmDelete = () => {       
        setIsLoading(true);
        const api = new RestDataSource();
      
        const payload = {
          operation: "delete account",
          accountid: selectedContact.id
        };
      
        api.PostData(
          process.env.REACT_APP_API_URL + "/services/apexrest/data",
          (response) => {
            if (response && response.data) {
             // getContactList();
              toast.success("Requested to delete the account record");
            }
          },
          payload
        );
        setIsLoading(false);
        setShowDeleteModal(false);
      }

      const handleDeleteClick = (rowData) => {
        setSelectedContact(rowData);
        setShowDeleteModal(true);
      };
      
    return (
        <>
            <Header />
            <div className="mainTitle">Contacts</div>
            <Spinner isLoading={isLoading} />
            <div className="mainContentBox">
                <div className="row">
                    <div className="col-md-6 marginBottom">

                        <div className="form-group has-search search-box">
                            <span className="fa fa-search form-control-feedback searchIcon" />
                            <input type="text" className="form-control" 
                            value={globalFilterValue}
                            onChange={(e) => setGlobalFilterValue(e.target.value)} 
                            placeholder="Search contacts by name, email or phone..." />
                        </div>

                    </div>
                    <div className="col-md-6 text-end">
                        {/* <button type="submit" onClick={() => setShowModal(true)} className="btn btn-primary submitBtn common-btn mr10">
                            <i className="fa-solid fa-user-plus mr10"></i>Add New Contact
                        </button> */}
                        <button type="submit" onClick={() => setShowCampaginModal(true)} className="btn btn-primary submitBtn common-btn">
                            <i className="fa-solid fa-plus mr10"></i>Add to Campaign
                        </button>
                    </div>
                </div>
                <div className="row mt-4">        
                      <DataTable
                            className="tableBorder"
                            size="small"
                            value={contacts}
                            selectionMode="checkbox"
                            selection={selectedItem}
                            onSelectionChange={(e) => setSelectedItem(e.value)}
                            dataKey="id"
                            paginator
                            rows={5}                            
                            globalFilter={globalFilterValue}
                            globalFilterFields={columns.map(col => col.field)} // use all field names
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
                            }}
                            >
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                            {columns.map((col, i) => (
                                <Column
                                key={i}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                                sortable={col.sortable ?? false}
                                />
                            ))}
                        </DataTable>
                      </div>
                      <AddToCampaignModal
                        isOpen={showCampaginModal}
                        onRequestClose={() => setShowCampaginModal(false)}
                        selectedItem={selectedItem}
                        onSubmit={(newContact) => {
                            setContacts((prev) => [...prev, newContact]);
                        }}
                        />
                        <EditContactModal
                        isOpen={showEditModal}
                        onRequestClose={() => setShowEditModal(false)}
                        selectedRow={selectedRow}
                        onSubmit={(newContact) => {
                            setContacts((prev) => [...prev, newContact]);
                        }}
                      />
                      <DeleteConfirmationModal
                        isOpen={showDeleteModal}
                        onRequestClose={() => setShowDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                        contactName={selectedContact?.name}
                      />
            </div>
            <Footer />
        </>

    );
};
export default Contacts;