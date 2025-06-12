import React, { useState, useEffect } from "react";
import RestDataSource from "../services/API-request";
import AddContactModal from "./AddContactModal";
import EditContactModal from "./EditContactModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";

const sampleContacts = [
    {
        id: 1,
        name: "Smeeta Ghorpade",
        email: "smeeta.ghorpade@gmail.com",
        phone: "9096357565",
        city: "Pune",
        status: "Active",
        actions: "true"
      },
      {
        id: 2,
        name: "Shivaji Patil",
        email: "shivaji.patil@gmail.com",
        phone: "9096357566",
        city: "Mumbai",
        status: "Active",
        actions: "true"
      },
      {
        id: 3,
        name: "Milind Nikam",
        email: "milind.nikam@gmail.com",
        phone: "9096357588",
        city: "Nagpur",
        status: "Active"
      },
      {
        id: 4,
        name: "Shantanu Kadam",
        email: "shantanu.kadam@gmail.com",
        phone: "9096357554",
        city: "Kolhapur",
        status: "Active"
      },
      {
        id: 5,
        name: "Amardeep Tayade",
        email: "amardeep.tayade@gmail.com",
        phone: "9096357590",
        city: "Nashik",
        status: "Inactive"
      },
      {
        id: 6,
        name: "Rutuja Chinchwade",
        email: "rutuja.chinchwade@gmail.com",
        phone: "9096357565",
        city: "Pune",
        status: "Active"
      }
  ];

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
      const [columns, setColumns] = useState([]);
      const [selectedItem, setSelectedItem] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const [globalFilterValue, setGlobalFilterValue] = useState('');
      const [showEditModal, setShowEditModal] = useState(false);
    
      const handleAddContact = (newContact) => {
        setContacts((prev) => [...prev, newContact]);
      };
    
      useEffect(() => {
        const api = new RestDataSource();
    
        const payload = {
          // Add filters or other request body if needed
        };
    
        // Uncomment this and replace with real API call
        // api.PostData("/api/contact/list", (response) => {
        //   if (response && response.data) {
        //     setContacts(response.data);
        //     generateColumns(response.data);
        //   }
        // }, payload);
    
        setContacts(sampleContacts);
        generateColumns(sampleContacts);
      }, []);
    
      // Generate columns from object keys
      const generateColumns = (data) => {
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => {
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
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <i className="fa fa-pencil" onClick={() => setShowEditModal(true)} style={{ color: 'maroon', cursor: 'pointer' }}></i>
                    <i className="fa fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
                  </div>
                ),
              };
            }  
            // Default sortable column with custom sort icons
            return {
              field: key,
              header: key.charAt(0).toUpperCase() + key.slice(1),
              sortable: true,          
            };
          });
      
          setColumns(cols);
        }
      };

    return (
        <>
            <Header />
            <div className="mainTitle">Contacts</div>
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
                        <button type="submit" onClick={() => setShowModal(true)} className="btn btn-primary submitBtn common-btn mr10">
                            <i class="fa-solid fa-user-plus mr10"></i>Add New Contact
                        </button>
                        <button type="submit" onClick={() => setShowModal(true)} className="btn btn-primary submitBtn common-btn">
                            <i class="fa-solid fa-plus mr10"></i>Add to Campaign
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
                      <AddContactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onSubmit={(newContact) => {
            setContacts((prev) => [...prev, newContact]);
        }}
        />
        <EditContactModal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        onSubmit={(newContact) => {
            setContacts((prev) => [...prev, newContact]);
        }}
        />
            </div>
            <Footer />
        </>

    );
};
export default Contacts;