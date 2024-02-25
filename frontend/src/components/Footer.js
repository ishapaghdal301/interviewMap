import React from "react";
import "../assets/styles/Footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
    return (
        <div>
            <footer style={{ padding: "70px" }} className="site-footer">
                <div className="container-">
                    <div className="row w-100">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify">
                                InterviewMap Interview Map is a
                                platform that offers coding test and interview taking services.
                                We provide a comprehensive platform for both candidates and
                                interviewers to streamline the interview process.
                            </p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Our Services</h6>
                            <ul className="footer-links">
                                <li>
                                    <a href="#Crop Recommendationr">Coding Tests</a>
                                </li>
                                <li>
                                    <a href="#Crop Yield Prediction">Take Interviwe</a>
                                </li>
                                <li>
                                    <a href="#Fertilizer Recommendation">
                                        Create Test
                                    </a>
                                </li>
                                <li>
                                    <a href="#Soil Analysis">Collabrative Compiler</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li>
                                    <a href="#quick-about">About Us</a>
                                </li>
                                <li>
                                    <a href="#quick-contact">Contact Us</a>
                                </li>
                                <li>
                                    <a href="#quick-contribute">Contribute</a>
                                </li>
                                <li>
                                    <a href="#quick-privacy">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="container-">
                    <div className="row w-100">
                        <div className="col-md-8">
                            <p className="copyright-text">
                                Copyright &copy; 2024 All Rights Reserved by
                                <span>InterviewMap</span>.
                            </p>
                        </div>

                        <div className="col-md-4">
                            <ul className="social-icons">
                                <li>
                                    <a className="twitter" href="#twitter">
                                        <TwitterIcon />
                                    </a>
                                </li>
                                <li>
                                    <a className="dribbble" href="#dribbble">
                                        <GitHubIcon />
                                    </a>
                                </li>
                                <li>
                                    <a className="linkedin" href="#linkedin">
                                        <LinkedInIcon />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;