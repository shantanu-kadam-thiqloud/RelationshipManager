import React from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";

const Campaigns = () => {

    const campaignData = [
        {
          id: 1,
          name: "Campaign A",
          guestCount: 6,
          startDate: "06-Jun-2025",
          endDate: "07-Jun-2025",
          description:
            "Campaign A targeted users via social media channels to boost product awareness and collect feedback.",
        },
        {
          id: 2,
          name: "Campaign B",
          guestCount: 12,
          startDate: "10-Jun-2025",
          endDate: "15-Jun-2025",
          description:
            "Campaign B was designed to increase sales through limited-time offers and influencer collaborations.",
        },
        {
          id: 3,
          name: "Campaign C",
          guestCount: 8,
          startDate: "18-Jun-2025",
          endDate: "20-Jun-2025",
          description:
            "Campaign C focused on user retention via personalized email marketing and loyalty rewards.",
        },
        {
          id: 4,
          name: "Campaign D",
          guestCount: 15,
          startDate: "22-Jun-2025",
          endDate: "27-Jun-2025",
          description:
            "Campaign D involved a product launch webinar with exclusive early-bird registration offers.",
        },
        {
          id: 5,
          name: "Campaign E",
          guestCount: 9,
          startDate: "30-Jun-2025",
          endDate: "05-Jul-2025",
          description:
            "Campaign E focused on brand storytelling through blogs, videos, and customer testimonials.",
        },
      ];

    return (
        <>
            <Header />
            <div className="mainTitle">Campaigns</div>
            <div className="mainContentBox1">
            <div className="row">
                {campaignData.map((campaign) => (
                    <div className="col-md-4 mb30" key={campaign.id}>
                    <div className="campaignCard">
                        <div className="badge">Guest Count: {campaign.guestCount}</div>
                        <div className="campaignContent">
                        <div className="CampaignName">{campaign.name}</div>
                        <div className="row">
                            <div className="col-md-6">
                            <div className="strongText">
                                Start Date:{" "}
                                <span className="spanText">{campaign.startDate}</span>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="strongText">
                                End Date: <span className="spanText">{campaign.endDate}</span>
                            </div>
                            </div>
                        </div>
                        <div className="description">{campaign.description}</div>
                        </div>
                        <div className="button common-card-btn">
                        VIEW CAMPAIGN DETAILS <i className="fa-solid fa-arrow-right floatRight"></i>
                        </div>
                    </div>
                    </div>
                ))}
            </div>

            </div>
            <Footer />
        </>

    );
};
export default Campaigns;