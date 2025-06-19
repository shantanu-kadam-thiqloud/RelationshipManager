import React,{useState, useEffect} from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";
import { Link, useLocation } from "react-router-dom";
import RestDataSource from "../services/API-request";
import Spinner from "../CommonComponents/Spinner";

const Campaigns = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [campaignList, setCampaignList] = useState(null);
       useEffect(() => {
              setIsLoading(true);
              const api = new RestDataSource();
              api.GetData(
                process.env.REACT_APP_API_URL + "/services/apexrest/data/campaigns",
                (response) => {
                  if (response && response.data) {               
                      setCampaignList(response.data.data);                      
                  }
                },                
              );
              setIsLoading(false);
            }, []);

    return (
        <>
            <Header />
            <div className="mainTitle">Campaigns</div>
            <Spinner isLoading={isLoading} />
            {campaignList && (
            <div className="mainContentBox1">
            <div className="row">
                {campaignList.map((campaign) => (
                    <div className="col-md-4 mb30" key={campaign.Id}>
                    <div className="campaignCard">
                        <div className="badge">Guest Count: {campaign?.NumberOfContacts ? campaign?.NumberOfContacts : 0}</div>
                        <div className="campaignContent">
                        <div className="CampaignName">{campaign.Name}</div>
                        <div className="row">
                            <div className="col-md-6">
                            <div className="strongText">
                                Start Date:{" "}
                                <span className="spanText">{campaign.StartDate}</span>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="strongText">
                                End Date: <span className="spanText">{campaign.EndDate}</span>
                            </div>
                            </div>
                        </div>
                        <div className="description">{campaign?.Description}</div>
                        </div>
                        <Link className="CPDetailsLink" to="/campaign-details">
                        <div className="button common-card-btn">                        
                          VIEW CAMPAIGN DETAILS <i className="fa-solid fa-arrow-right floatRight"></i>                        
                       </div>
                       </Link>
                    </div>
                    </div>
                ))}
            </div>

            </div>
            )}
            <Footer />
        </>

    );
};
export default Campaigns;