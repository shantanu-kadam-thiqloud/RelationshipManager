import React,{ useState, useEffect } from "react";
import Modal from "react-modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import RestDataSource from "../services/API-request";

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
  console.log(selectedItem)
  const [campaignList, setCampaignList] = useState(null);
  useEffect(() => {
    const api = new RestDataSource();
    api.GetData(
      process.env.REACT_APP_API_URL + "/services/apexrest/data/campaigns",
      (response) => {
        if (response && response.data) {
          setCampaignList(response.data.data);
          console.log("campaign data", response.data)
        }
      },
    );
  }, []);

  const sampleCampaigns = [
    { id: 1, name: "Campaign A" },
    { id: 2, name: "Campaign B" },
    { id: 3, name: "Campaign C" },
    { id: 4, name: "Campaign D" },
    { id: 5, name: "Campaign E" },
  ];
  // const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState(null);

  const handelAddCampaignSubmit = async (values) => {
    console.log("Inside handelAddCampaignSubmit")

    if (!selectedItem || selectedItem.length === 0 || selectedCampaigns.length === 0) {
      toast.error("Please select at least one contact and one campaign.");
      return;
    }

    // const contactIds = selectedItem.map(item => item.id); 
    const contactIds = selectedItem.map(item => item.personContactId); 
    const campaignIds = selectedCampaigns.map(camp => camp.Id); 
    console.log("contactIds = ",contactIds);
    console.log("campaignIds = ",campaignIds);

    const api = new RestDataSource();
    const payload = {
      "operation": "add to campaign",
      "campaignid": campaignIds[0],
      "contactid": contactIds[0]
    };
    api.AddCampaingMenber(process.env.REACT_APP_API_URL + "/services/apexrest/data", (response) => {
      console.log(response);
      if (response && response.status=== 200) {
        toast.success(response.data.message);
      }
    }, payload);

  };

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
        {/* <DataTable
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
        </DataTable> */}
        <div className="row" style={{ maxHeight: "250px", overflowY: "auto" }}>
        <DataTable
         className="tableBorder"
          size="small"
          value={campaignList}
          selection={selectedCampaigns}
          onSelectionChange={(e) => setSelectedCampaigns(e.value)}
          scrollable  
          dataKey="Id" 
          dragSelection
          // selectionMode="checkbox"
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}/>
          <Column field="Name" header="Campaign Name" />
        </DataTable>
        </div>
      </div>
      <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary submitBtn common-btn2 mr10"onClick={handelAddCampaignSubmit}>
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
