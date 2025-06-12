import React from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";

const EditGuest = () => {

    return (
        <>
            <Header />

            <div className="mainContentBox">
                <div className="infoBox mb30">
                    <div className="infoTitle">Basic Information</div>
                    <div className="infoContent">
                        <form>
                            <div className="row edit-guest">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Campaign Member
                                        </label>
                                        <input type="text" class="form-control" disabled id="exampleFormControlInput1" placeholder="Enter Campaign Member" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Email Address
                                        </label>
                                        <input type="email" class="form-control" disabled id="exampleFormControlInput1" placeholder="Enter Email Address" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Phone Number
                                        </label>
                                        <input type="number" class="form-control" disabled id="exampleFormControlInput1" placeholder="Enter Phone Number" />
                                    </div>
                                </div>

                                <div className="col-md-4 campaign-details">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Guest Type
                                        </label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Select Guest Type</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Number of Guest
                                        </label>
                                        <input type="number" class="form-control" disabled id="exampleFormControlInput1" placeholder="Enter Number of Guest" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Relationship Manager
                                        </label>
                                        <input type="number" class="form-control" disabled id="exampleFormControlInput1" placeholder="Enter Relationship Manager" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="infoBox mb30">
                    <div className="infoTitle">Campaign Details</div>
                    <div className="infoContent">
                        <form>
                            <div className="row edit-guest">

                                <div className="col-md-4 campaign-details">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            RSVP Status
                                        </label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Select RSVP Status</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Table Number #
                                        </label>
                                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter Table Number #" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Paddle Number #
                                        </label>
                                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter Paddle Number #" />
                                    </div>
                                </div>

                                <div className="col-md-4 campaign-details">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Invitation Sent
                                        </label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4 campaign-details">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Checked In
                                        </label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Yes</option>
                                            <option>No</option>

                                        </select>
                                    </div>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>

                <div className="infoBox mb0">
                    <div className="infoTitle">Relationship Manager Comment</div>
                    <div className="infoContent">
                        <form>
                            <div className="row SelectArea">

                                <div className="col-md-12">
                                    <div class="mb-2 mt-2">

                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter any additional information about this guest..."></textarea>
                                    </div>
                                </div>



                            </div>
                        </form>
                    </div>
                </div>
                <div className="text-end mt-4">
                    <button type="submit" className="btn btn-primary submitBtn common-btn2 mr10">
                        save
                    </button>
                    <button type="submit" className="btn btn-primary submitBtn common-btn2">
                        cancel
                    </button>
                </div>
            </div>

            <Footer />
        </>

    );
};
export default EditGuest;