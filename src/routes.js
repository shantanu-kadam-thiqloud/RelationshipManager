// src/routes.js
import ContactList from "./components/ContactList";
import CampaignList from "./components/CampaignList";
import Login from "./components/Login";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/campaignList",
    element: <CampaignList />,
  },
  {
    path: "/contactList",
    element: <ContactList />,
  },
];

export default routes;
