import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { getSessionStorage } from "../Components/CommonComponents/cookieData";

export default class RestDataSource {
  async GetData(APIURL, callback) {
    this.SendRequest("get", APIURL, callback);
  }
  async PostData(APIURL, callback, data, LoginApi) {
    const USER = null//await getSessionStorage("USER");     
     //data.userName = USER !== null ? USER.userName : "";
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

  async SendRequest(method, url, callback, data, LoginApi) {
    const USER = null //await getSessionStorage("USER");  
    let token = "00DWr000000aBL7!AQEAQI_RzvLyE1TBYLgc6zj9KqVWoJqE7K1iccLf4XBC.nuwfnnl3Ivr8AuuT8nUT5U3qSI_uwnoaerrr5f9.VQY.C9ZBFR9" //process.env.REACT_APP_API_TOKEN  //sessionStorage.getItem("authToken");   //USER !== null ? USER.token : ""; 
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
      if (error.response) { 
        if (error.response.status === 401) {
          toast.error("Session expired or invalid user, please login", {
            position: "top-right",
            autoClose: false,
          });
        
          setTimeout(function() {
           // sessionStorage.clear();
           // window.location.href = "/rjsbcl/";
          }, 5000);  // This ensures toast is displayed before clearing and redirecting
        } else if (error.response.status === 429) {
          toast.error("Too many requests, Please try after sometimes", {
            position: "top-right",
            autoClose: false,
          });
        } else {
          toast.error(error.response.data.responseMetaData.message, {
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
