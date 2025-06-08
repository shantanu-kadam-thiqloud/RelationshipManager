import React, { useState, useEffect } from "react";
import RestDataSource from "../services/API-request";
import Modal from "react-modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const sampleContacts = [
  {
    id: 1,
    name: "Shantanu Kadam",
    email: "shantanu@example.com",
    phone: "+91-9876543210",
  },
  {
    id: 2,
    name: "Amrut Patil",
    email: "amrut@example.com",
    phone: "+91-9123456780",
  },
  {
    id: 3,
    name: "Neha Sharma",
    email: "neha@example.com",
    phone: "+91-9988776655",
  },
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

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
      const cols = Object.keys(data[0]).map((key) => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }));
      setColumns(cols);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5">Contact List</h2>
      <div className="row">
        <div className="col-md-9"></div>
        <div className="col-md-3"><button
            className="btn submitbtn me-2 mt-2 mb-4"
            type="button"
            onClick={() => setIsOpen(true)}
        >
            Add Contact
            </button>
            <button
                className="btn submitbtn min mt-2 mb-4"
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Add Campaign
            </button>
        </div>
      </div>
      <div className="row">        
        <DataTable className="tableBorder" value={contacts}  selectionMode= 'rowClick' selection={selectedItem} onSelectionChange={(e) => setSelectedItem(e.value)} dataKey="id" paginator rows={5}>
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} sortable />
            ))}
        </DataTable>
      </div>  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          abc
          <button className="submitBtn" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  },
};

export default ContactList;
