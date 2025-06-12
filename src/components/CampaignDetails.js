import React from "react";
import Header from "../CommonComponents/Header";

const CampaignDetails = () => {

    return (
        <>
            <Header />
            <div className="campaign-detail-box">
                <div className="mainTitle2">Campaign 1</div>
                <div class="dates">
                    <span className="strongText">Start Date:</span> 06-Jun-2025 &nbsp;&nbsp; <span className="strongText">End Date:</span> 07-Jun-2025
                </div>
                <div class="description2">
                    Campaigns often include financial metrics to assess their effectiveness. This may involve tracking costs, estimated revenue…
                </div>
            </div>
            <div className="mainContentBox">
                <form>



                    <div className="form-group has-search search-box mb30">
                        <span className="fa fa-search form-control-feedback searchIcon" />
                        <input type="text" className="form-control" placeholder="Search contacts by name, email or phone..." />
                    </div>



                    <div className="row campaign-details">
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Guest Type
                                </label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>All Type</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    RSVP Status
                                </label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>All Status</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Check In
                                </label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>All Status</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Invitation
                                </label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>All Status</option>

                                </select>
                            </div>
                        </div>
                    </div>

                </form>

            </div>


        </>

    );
};
export default CampaignDetails;