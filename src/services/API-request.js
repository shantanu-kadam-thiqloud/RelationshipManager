import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class RestDataSource {
  async GetData(APIURL, callback) {
    this.SendRequest("get", APIURL, callback);
  }
  async PostData(APIURL, callback, data, LoginApi) {    
    this.SendRequest("post", APIURL, callback, data, LoginApi);
  }
  async Update(APIURL, callback, data) {
    this.SendRequest("patch", APIURL, callback, data);
  }
  async Delete(APIURL, data, callback) {
    this.SendRequest("delete", APIURL, callback, data);
  }
  async UserLogin(APIURL, callback, data, LoginApi) {
    this.SendRequest("post", APIURL, callback, data, LoginApi);
  }
  async AddCampaingMenber(APIURL, callback, data,) {
    this.SendRequest("post", APIURL, callback, data);
  }
  async SendRequest(method, url, callback, data, LoginApi) {    
    let token = "00DWr000000aBL7!AQEAQMiasqnwXyCPe6jgZX2zti1V61AKEY5jdzO5kh.8mgUcw6xJQkFKeKdgJ1Yr3KLHH24qsMXVIs2sN20fPXYhcqopE3XT" //process.env.REACT_APP_API_TOKEN  //sessionStorage.getItem("authToken");
    try {
      let response = await axios.request({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      callback(response);
    } catch (error) {
      console.log("error =",error);
      if (error.response) { 
        if (error.response.status === 401) {
          toast.error("Session expired or invalid user, please login", {
            position: "top-right",
            autoClose: false,
          });
        
          setTimeout(function() {           
          }, 5000);  // This ensures toast is displayed before clearing and redirecting
        } else if (error.response.status === 429) {
          toast.error("Too many requests, Please try after sometimes", {
            position: "top-right",
            autoClose: false,
          });
        } else {          
          console.log("errpr = ",error.response.data.message);
          toast.error(error.message, {
            position: "top-right",
            autoClose: false,
          });
         // callback(error.response);
        }
      }
      console.error("Error:", error);
    }
  }
}
