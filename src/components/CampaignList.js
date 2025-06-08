import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import Spinner from "../CommonComponents/Spinner"

const sampleEvents = [
  {
    id: 1,
    title: "React Conference 2025",
    date: "2025-08-12",
    location: "Bangalore, India",
    description: "A full-day event exploring the latest in React and frontend technologies.",
  },
  {
    id: 2,
    title: "JS Bootcamp",
    date: "2025-09-05",
    location: "Pune, India",
    description: "Intensive JavaScript training for beginners and intermediate devs.",
  },
  {
    id: 3,
    title: "Tech Expo",
    date: "2025-10-22",
    location: "Hyderabad, India",
    description: "Annual tech showcase with startups and innovation demos.",
  },
];

const CampaignList = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        toast.success("Welcome! This toast shows on page load.");
        const timer = setTimeout(() => {
            setIsLoading(false);
          }, 2000); // 2 seconds delay
      
          // cleanup timer on unmount
          return () => clearTimeout(timer);
      }, []); 
  return (
    <div style={styles.container}>
    <Spinner isLoading={isLoading} />
      <h2>Upcoming Campaign</h2>
      {sampleEvents.map((event) => (
        <div key={event.id} style={styles.card}>
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>{event.description}</p>
        </div>
      ))}       
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default CampaignList;
