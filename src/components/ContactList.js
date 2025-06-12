import React, { useState, useEffect } from "react";
import RestDataSource from "../services/API-request";
import AddContactModal from "./AddContactModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "40%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

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
                <i className="fa fa-pencil" style={{ color: 'maroon', cursor: 'pointer' }}></i>
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
    <div className="container">
      <h2 className="mt-5">Contact List</h2>
      <div className="row">
        <div className="col-md-8"><span className="p-input-icon-left" style={{ marginBottom: '10px' }}>
            <i className="pi pi-search" />
            <input
                type="text"
                // value={globalFilterValue}
                // onChange={(e) => setGlobalFilterValue(e.target.value)}
                placeholder="Global Search"
                className="p-inputtext p-component"
            />
            </span>
            </div>
        <div className="col-md-4 textright">
        <button
            className="btn btn-primary btn-add me-2 mt-2 mb-4"
            type="button"
            onClick={() => setShowModal(true)}            
            >
            Add Contact
            </button>
            <button
                className="btn btn-primary btn-add min mt-2 mb-4"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add To Campaign
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
            filterDisplay="row"
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
    </div>
  );
};
export default ContactList;
