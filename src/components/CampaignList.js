import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import Spinner from "../CommonComponents/Spinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import RestDataSource from "../services/API-request";

const sampleEvents = [
  {
    id: 1,
    title: "React Conference 2025",
    date: "2025-08-12",
    location: "Bangalore, India",
    description: "A full-day event exploring the latest in React and frontend technologies.",
  },
  {
    id: 2,
    title: "JS Bootcamp",
    date: "2025-09-05",
    location: "Pune, India",
    description: "Intensive JavaScript training for beginners and intermediate devs.",
  },
  {
    id: 3,
    title: "Tech Expo",
    date: "2025-10-22",
    location: "Hyderabad, India",
    description: "Annual tech showcase with startups and innovation demos.",
  },
];

const CampaignList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [CampaignList, setCampaignList] = useState(null);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        toast.success("Welcome! This toast shows on page load.");
        const timer = setTimeout(() => {
            setIsLoading(false);
          }, 2000); // 2 seconds delay
      
          // cleanup timer on unmount
          return () => clearTimeout(timer);
      }, []);

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
      
          setCampaignList(sampleEvents);
          generateColumns(sampleEvents);
        }, []);

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
              sortIcon: <i className="fa fa-angle-up" />,
              unsortIcon: <i className="fa fa-angle-down" />,
            };
          });
      
          setColumns(cols);
        }
      };

  return (
    <div className="container">
    <Spinner isLoading={isLoading} />
      <h2 className="mt-5">Upcoming Campaign</h2>
      {/* {sampleEvents.map((event) => (
        <div key={event.id} style={styles.card}>
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>{event.description}</p>
        </div>
      ))}        */}
      <DataTable className="tableBorder" size='small' value={CampaignList}  selectionMode= 'checkbox' selection={selectedItem} onSelectionChange={(e) => setSelectedItem(e.value)} dataKey="id" 
            paginator
            rows={5}
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
            }} >
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                  {columns.map((col, i) => (
                  <Column
                  key={i}
                  field={col.field}
                  header={col.header}
                  body={col.body}
                  sortable={col.sortable ?? false}
                  sortIcon={col.sortIcon}
                  unsortIcon={col.unsortIcon}
                />
                  ))}
              </DataTable>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default CampaignList;
