import React,{ useState, useEffect } from "react";
import Modal from "react-modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "433px",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    borderRadius: "4px",
  },
};

Modal.setAppElement("#root");

const AddToCampaignModal = ({ isOpen, onRequestClose, selectedItem }) => { 
  const sampleCampaigns = [
    { id: 1, name: "Campaign A" },
    { id: 2, name: "Campaign B" },
    { id: 3, name: "Campaign C" },
    { id: 4, name: "Campaign D" },
    { id: 5, name: "Campaign E" },
  ];
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add To Campaign"
      style={customStyles}
    >
      <div className="textright">
        <i className="fa-solid fa-xmark" onClick={onRequestClose} ></i>
      </div>
      <h5 className="titleText">Add To Campaign</h5>
      <div className="text-end mt-4 description"> No of Guests:<strong>6</strong></div>
      <div className="row">
        <DataTable
         className="tableBorder"
          size="small"
          value={sampleCampaigns}
          selection={selectedCampaigns}
          onSelectionChange={(e) => setSelectedCampaigns(e.value)}
          dataKey="id"
          selectionMode="checkbox"
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
          <Column field="name" header="Campaign Name" />
        </DataTable>
      </div>
      <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary submitBtn common-btn2 mr10">
                Add
              </button>
              <button type="submit" className="btn btn-primary submitBtn common-btn2" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
    </Modal>
  );
};

export default AddToCampaignModal;
