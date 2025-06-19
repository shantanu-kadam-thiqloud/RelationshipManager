import React, { useEffect, useState } from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";
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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [CampaignList, setCampaignList] = useState(null);
  const [columns, setColumns] = useState([]);

    useEffect(() => {
      setIsLoading(true);
    const api = new RestDataSource();

    api.GetData(
      process.env.REACT_APP_API_URL + "/services/apexrest/data/campaigns",
      (response) => {
        if (response && response.data) {
          const transformedData = response.data.data.map((item) => ({
            //id: item.Id,
            Campaign_Name: item.Name || "",           
            Start_Date: item.StartDate || "",
            End_Date: item.EndDate || "",
            Description: item?.Description || "",      
            Created_By: item?.Created_By_Formula__c || ""            
          }));             
            setCampaignList(transformedData);
            generateColumns(transformedData);
            setIsLoading(false);        
        }else{
         // setIsLoading(false);
        }
      },                
    );   
  }, []);

  const generateColumns = (data) => {
    if (data.length > 0) {
      const cols = Object.keys(data[0]).map((key,value) => {
        return {
          field: key,
          header: key.replace(/_/g, " "),
          sortable: true,          
        };
      });
      setColumns(cols.filter(Boolean)); 
      //setColumns(cols);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="mainTitle">Dashboard
        <Spinner isLoading={isLoading} />
        <h2 className="mt-3 CampaignName1">Upcoming Campaigns</h2>
        <DataTable
            className="tableBorder"
            size="small"
            value={CampaignList}
            selectionMode="checkbox"
            selection={selectedItem}
            onSelectionChange={(e) => setSelectedItem(e.value)}
            dataKey="id"
            paginator
            rows={5}
            totalRecords={CampaignList?.length} // ✅ Make sure this is correctly passed
            paginatorTemplate={{
              layout: 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
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
            currentPageReportTemplate="Page {currentPage} of {totalPages} (Total Records: {totalRecords})"
          >          
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
        </DataTable></div>
      <Footer />
    </>
  );
};
export default Dashboard;