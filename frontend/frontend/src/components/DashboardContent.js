import React from "react";
import "../assets/styles/DashboardContent.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Star, MonetizationOn, Schedule } from "@mui/icons-material";
function DashboardContent() {
    return (
        <div>
            <div className="home-page">
                <div className="content">
                    <h1>Welcome to Interview Map</h1>
                    <img
                        src="https://cdn-ddhbi.nitrocdn.com/oQUUkmjvDPdPLvhisuibbubwHakMrNcj/assets/images/optimized/rev-ebe444f/interviewer.ai/wp-content/uploads/2021/07/line.png"
                        style={{ width: "50%", height: "50%", margin: "0 0 30px 15px" }}
                        alt="Interview Map"
                    />

                    <p>
                        Interview Map is a comprehensive platform offering coding tests and
                        interview services. Designed for candidates and interviewers alike,
                        our platform equips candidates with coding challenges and practice
                        questions to excel in technical interviews. Interviewers benefit
                        from seamless tools like video calls and collaborative code editors,
                        facilitating efficient candidate assessments. With Interview Map,
                        candidates gain confidence in their interview preparation, while
                        interviewers identify top talent effortlessly. Whether you're a job
                        seeker aiming for success or a recruiter seeking exceptional
                        candidates, Interview Map streamlines your journey towards
                        professional excellence.
                    </p>
                </div>
                <div className="image">
                    <img
                        src="https://cdn-ddhbi.nitrocdn.com/oQUUkmjvDPdPLvhisuibbubwHakMrNcj/assets/images/optimized/rev-ebe444f/interviewer.ai/wp-content/uploads/2021/11/Group-33945-1024x812.jpg"
                        alt="Interview Map"
                    />
                </div>
            </div>
            <div className="cards">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                "&:hover": {
                                    boxShadow:
                                        "0px 0px 2cpx 0px rgba(96.000000199028,97.000000132685,99,.32)",
                                    backgroundColor: "rgba(69, 123, 232, 0.227)",
                                },
                            }}
                        >
                            <CardContent sx={{ padding: "50px" }}>
                                <Star sx={{ fontSize: "4em", marginBottom: "10px", color: '#161a28' }} />
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{ color: "#007bff" }}
                                >
                                    Smart Hiring
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        lineHeight: "30px",
                                        fontSize: "1.1em",
                                        wordSpacing: "5px",
                                        letterSpacing: ".7px",
                                        color: "#7a91ab",
                                    }}
                                >
                                    Our platform, InterviewMap, provides a seamless solution for
                                    conducting online coding tests and interviews. Utilize our
                                    collaborative whiteboard and code compiler during interviews
                                    for enhanced communication and evaluation.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                "&:hover": {
                                    boxShadow:
                                        "0px 0px 2cpx 0px rgba(96.000000199028,97.000000132685,99,.32)",
                                    backgroundColor: "rgba(69, 123, 232, 0.227)",
                                },
                            }}
                        >
                            <CardContent sx={{ padding: "50px" }}>
                                <MonetizationOn
                                    sx={{ fontSize: "4em", marginBottom: "10px", color: '#161a28' }}
                                />
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{ color: "#007bff" }}
                                >
                                    Cost-Effective
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        lineHeight: "30px",
                                        fontSize: "1.1em",
                                        wordSpacing: "5px",
                                        letterSpacing: ".7px",
                                        color: "#7a91ab",
                                    }}
                                >
                                    InterviewMap saves you money by streamlining your hiring
                                    process. With efficient pre-screening tools, cut down on
                                    unnecessary expenses associated with traditional hiring
                                    methods. without conducting test offline have online test.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                "&:hover": {
                                    boxShadow:
                                        "0px 0px 2cpx 0px rgba(96.000000199028,97.000000132685,99,.32)",
                                    backgroundColor: "rgba(69, 123, 232, 0.227)",
                                },
                            }}
                        >
                            <CardContent sx={{ padding: "50px" }}>
                                <Schedule sx={{ fontSize: "4em", marginBottom: "10px", color: '#161a28' }} />
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{ color: "#007bff" }}
                                >
                                    Coding-Test
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        lineHeight: "30px",
                                        fontSize: "1.1em",
                                        wordSpacing: "5px",
                                        letterSpacing: ".7px",
                                        color: "#7a91ab",
                                    }}
                                >
                                    With InterviewMap's Coding-Test Generation feature, easily
                                    create custom coding assessments tailored to your specific
                                    needs. Streamline your hiring process and efficiently evaluate
                                    candidates' programming skills.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default DashboardContent;