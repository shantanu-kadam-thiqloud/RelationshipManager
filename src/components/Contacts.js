import React from "react";
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";

const Contacts = () => {

    return (
        <>
            <Header />
            <div className="mainTitle">Contacts</div>
            <div className="mainContentBox">
                <div className="row">
                    <div className="col-md-6 marginBottom">

                        <div className="form-group has-search search-box">
                            <span className="fa fa-search form-control-feedback searchIcon" />
                            <input type="text" className="form-control" placeholder="Search contacts by name, email or phone..." />
                        </div>

                    </div>
                    <div className="col-md-6 text-end">
                        <button type="submit" className="btn btn-primary submitBtn common-btn mr10">
                            <i class="fa-solid fa-user-plus mr10"></i>Add New Contact
                        </button>
                        <button type="submit" className="btn btn-primary submitBtn common-btn">
                            <i class="fa-solid fa-plus mr10"></i>Add to Campaign
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};
export default Contacts;