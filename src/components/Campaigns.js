import React from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";
import CampaignCard from '../CommonComponents/CampaignCard';

const Campaigns = () => {

    return (
        <>
            <Header />
            <div className="mainTitle">Campaigns</div>
            <div className="mainContentBox1">
                <div className="row">
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />

                </div>

            </div>
            <Footer />
        </>

    );
};
export default Campaigns;