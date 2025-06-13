import React from "react";

const CampaignCard = () => {

    return (
        <>

            <div className="col-md-4 mb30">
                <div className="campaignCard">
                    <div className="badge">Guest Count: 6</div>
                    <div className="campaignContent">



                        <div className="CampaignName">Campaign 1</div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="strongText">Start Date: <span className="spanText">06–Jun–2025</span></div>
                            </div>
                            <div className="col-md-6">
                                <div className="strongText">Start Date: <span className="spanText">07–Jun–2025</span></div>
                            </div>
                        </div>


                        <div className="description">
                            Campaigns often include financial metrics to assess their effectiveness. This may involve tracking costs, estimated revenue…
                        </div>

                    </div>
                    <div className="button common-card-btn">
                        VIEW CAMPAIGN DETAILS <i className="fa-solid fa-arrow-right floatRight"></i>

                    </div>

                </div>
            </div>

        </>
    )
};

export default CampaignCard;