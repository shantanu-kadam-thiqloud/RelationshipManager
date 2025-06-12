import React from "react";
import ProfileImg from '../Assets/Images/user2-160x160.jpg'
import HeaderLogo from '../Assets/Images/header-logo.png'
const Header = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg header-bg">
                <div className="container-fluid headerP">
                    <a className="navbar-brand" href="/dashboard">
                        <img src={HeaderLogo} />
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
                        {/* <span className="navbar-toggler-icon" /> */}
                        <div><i class="fa-solid fa-bars"></i></div>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link NavLink active" aria-current="page" href="/dashboard">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contacts">
                                    Contacts
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/campaigns">
                                    Campaigns
                                </a>
                            </li>

                            <li className="nav-item displayNone">
                                <a className="nav-link" href="/">
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
                                    Alexander Pierce
                                </span>

                            </a>

                        </li>
                        <li className="nav-item NavbarNav2 notext">
                            <a className="nav-link" href="/">
                                <span><i class="fa-solid fa-right-from-bracket fontIcon"></i></span>
                            </a>

                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default Header;