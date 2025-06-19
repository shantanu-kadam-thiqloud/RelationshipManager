import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Contacts from "./components/Contacts";
import Campaigns from "./components/Campaigns";
import CampaignDetails from "./components/CampaignDetails";
import EditGuest from "./components/EditGuest";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/campaigns",
    element: <Campaigns />,
  },
  {
    path: "/campaign-details",
    element: <CampaignDetails />,
  },
  {
    path: "/edit-guest",
    element: <EditGuest />,
  },

];

export default routes;
