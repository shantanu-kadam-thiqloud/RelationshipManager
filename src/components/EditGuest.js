import React,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../CommonComponents/Header";
import Footer from "../CommonComponents/Footer";
import RestDataSource from "../services/API-request";
import Spinner from "../CommonComponents/Spinner";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  rsvpStatus: Yup.string().required('RSVP Status is required'),
  invitationSent: Yup.string().required('Please select an option'),
  which_day: Yup.string().required('Please add which day value'),
  comment: Yup.string()
});

const EditGuestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const guest = location.state?.guest || {};
  var campaign = []
  campaign.Id = guest?.CampaignId;
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetails = () => {
    navigate('/campaign-details', {
      state: { campaign: campaign }
    });
  };

  const handleSubmit = (values) => {
      setIsLoading(true);
      const api = new RestDataSource();
  
      const payload = {
        "RSVP__c": values.rsvpStatus,
        "Invited__c": values.invitationSent === 'Yes' ? true : false,
        "Number_of_guests__c" : values.Number_of_guests,
        "Name_Of_The_Guest__c" : values.Name_Of_The_Guest,
        "Which_day__c" : values.which_day

      };
  
      api.Update(
        process.env.REACT_APP_API_URL + "/services/data/v64.0/sobjects/CampaignMember/" + guest.id,
        (response) => {
          if (response && response.status === 204) {
              toast.success("Campaign Member details Updated Successfully");
              handleViewDetails();
          }
        },
        payload
      );
      setIsLoading(false);
    }
  return (
    <>
    <Header />
    <Spinner isLoading={isLoading} />
    <Formik
     initialValues={{        
        rsvpStatus: guest?.RSVP_status || '',
        invitationSent: guest?.invited ? 'Yes' : 'No',
        comment: guest?.comment || '',
        which_day: guest?.which_day || '',
        Name_Of_The_Guest: guest?.Name_Of_The_Guest || '',
        Number_of_guests: guest?.Number_of_guests || ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
          handleSubmit(values)
      }}
    >
      {() => (
        <Form>
          <div className="mainContentBox">
            {/* Basic Info */}
            <div className="infoBox mb30">
              <div className="infoTitle">Basic Information</div>
              <div className="infoContent">
                <div className="row edit-guest">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={guest?.firstName || ''}
                        placeholder="Enter Campaign Member"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Middle Name</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={guest?.middleName || ''}
                        placeholder="Enter Campaign Member"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={guest?.lastName || ''}
                        placeholder="Enter Campaign Member"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        disabled
                        value={guest?.email || ''}
                        placeholder="Enter Email Address"
                      />
                    </div>
                  </div>                  
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="number"
                        className="form-control"
                        disabled
                        value={guest?.phone || ''}
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>
                  <div className="row edit-guest">
                  <div className="col-md-4 campaign-details">
                    <div className="mb-3">
                      <label className="form-label">RSVP Status</label>
                      <Field as="select" name="rsvpStatus" className="form-select">
                        <option value="">Select RSVP Status</option>
                        <option value="Opened">Opened</option>
                        <option value="Closed">Closed</option>
                        <option value="Not Responded">Not Responded</option>
                      </Field>
                      <ErrorMessage name="rsvpStatus" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4 campaign-details">
                    <div className="mb-3">
                      <label className="form-label">Invitation Sent</label>
                      <Field as="select" name="invitationSent" className="form-select">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                      <ErrorMessage name="invitationSent" component="div" className="text-danger" />
                    </div>
                  </div>               
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Number of Guest</label>
                      <Field
                        type="text"
                        className="form-control"                        
                        placeholder="Enter Number of Guest"
                        name='Number_of_guests'
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">Which Day</label>
                        <Field
                        type="text"
                        className="form-control"
                        name="which_day"
                        placeholder="Enter Which Day"
                        />
                        <ErrorMessage name="which_day" component="div" className="text-danger" />
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">Name of Guests</label>
                        <Field
                        type="text"
                        className="form-control"
                        name="Name_Of_The_Guest"
                        placeholder="Enter Which Day"
                        />
                        <ErrorMessage name="Name_Of_The_Guest" component="div" className="text-danger" />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>         

            {/* Relationship Manager Comment */}
            <div className="infoBox mb0">
              <div className="infoTitle">Relationship Manager Comment</div>
              <div className="infoContent">
                <div className="row SelectArea">
                  <div className="col-md-12">
                    <div className="mb-2 mt-2">
                      <Field
                        as="textarea"
                        name="comment"
                        className="form-control"
                        rows="3"
                        placeholder="Enter any additional information about this guest..."
                      />
                      <ErrorMessage name="comment" component="div" className="text-danger" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit / Cancel */}
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary submitBtn common-btn2 mr10">
                Save
              </button>
              <button
                type="button"
                onClick={() => handleViewDetails()}
                className="btn btn-primary submitBtn common-btn2"
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    <Footer />
    </>
  );
};

export default EditGuestForm;
