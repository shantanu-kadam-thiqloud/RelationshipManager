import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileImg from '../Assets/Images/user2-160x160.jpg';
import HeaderLogo from '../Assets/Images/header-logo.png';
import { toast } from "react-toastify";

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const nevigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userSessionData = JSON.parse(sessionStorage.getItem("userData"));
        if (userSessionData) {
            setUserData(userSessionData)
        }
        // else{
        //     toast.error("Unauthorized Access!");
        //     nevigate("/");
        // }
    }, []);

    const logout = () => {
        sessionStorage.removeItem("userData");
        toast.success("Logged out Succesfully");
        nevigate("/");
    }
    return (
        <nav className="navbar navbar-expand-lg header-bg">
            <div className="container-fluid headerP">
                <a className="navbar-brand" href="/dashboard">
                    <img src={HeaderLogo} alt="Header Logo" />
                </a>
                <button
                    className="navbar-toggler ThreeLine linebtn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <div><i className="fa-solid fa-bars"></i></div>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link NavLink ${currentPath === '/dashboard' ? 'active' : ''}`}
                                to="/dashboard"
                            >Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${currentPath === '/contacts' ? 'active' : ''}`}
                                to="/contacts"
                            >Contacts
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${currentPath === '/campaigns' || currentPath === 'campaign-details' ? 'active' : ''}`}
                                to="/campaigns"
                            >Campaigns
                            </Link>
                        </li>
                        <li className="nav-item displayNone">
                            <a className="nav-link" onClick={logout}>
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav profileCircle">
                    <li className="nav-item NavbarNav">
                        <a className="nav-link" href="#">
                            <span className="profileImg">
                                <img
                                    src={ProfileImg}
                                    alt="User Avatar"
                                    className="img-size-50 mr-2 mr-0 img-circle mr10"
                                />
                            </span>
                            <span className="hideName">
                                {userData?.Name}
                            </span>
                        </a>
                    </li>
                    <li className="nav-item NavbarNav2 notext">
                        <a className="nav-link" onClick={logout} role="button">
                            <span><i className="fa-solid fa-right-from-bracket fontIcon"></i></span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;