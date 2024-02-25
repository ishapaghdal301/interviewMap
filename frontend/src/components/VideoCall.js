import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import GitHubIcon from "@mui/icons-material/GitHub";
import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";
import { Dialog } from "primereact/dialog";
import UserPage from "../pages/UserPage";
import Compiler from "./Compiler";
import Canvas from "./WhiteBoard";
import 'bootstrap/dist/css/bootstrap.min.css';

function randomID(len) {
    let result = "";
    if (result) return result;
    var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(url = window.location.href) {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
}

export default function App() {
    const roomID = getUrlParams().get("roomID") || randomID(5);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isGithubOpen, setIsGithubOpen] = useState(false);
    const [isCodeOpen, setIsCodeOpen] = useState(false);
    const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
    const userName = localStorage.getItem('userName');

    let myMeeting = async (element) => {
        const appID = 567250147;
        const serverSecret = "78ffffac092a0abd8511c4d4f5d27ec8";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            randomID(5),
            userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Personal link",
                    url:
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        window.location.pathname +
                        "?roomID=" +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });

        setShowSidebar(true);
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {showSidebar && (
                <div
                    style={{
                        width: "3.4%",
                        backgroundColor: "#1E2130",
                        padding: "12px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <GitHubIcon
                            onClick={() => setIsGithubOpen(true)}
                            style={{
                                marginTop: "200px",
                                marginBottom: "40px",
                                cursor: "pointer",
                                fontSize: "40px",
                                color: "white",
                            }}
                        />
                        <Dialog
                            header="GitHub"
                            visible={isGithubOpen}
                            maximizable
                            style={{ width: "50vw", background: 'white', padding: "10px " }}
                            onHide={() => setIsGithubOpen(false)}
                        >
                            <UserPage />
                        </Dialog>
                        <CodeIcon
                            onClick={() => setIsCodeOpen(true)}
                            style={{
                                marginBottom: "40px",
                                cursor: "pointer",
                                fontSize: "40px",
                                color: "white",
                            }}
                        />
                        <Dialog
                            header="Compiler"
                            visible={isCodeOpen}
                            maximizable
                            style={{ width: "50vw", background: 'white', padding: "10px  0 0 0 " }}
                            onHide={() => setIsCodeOpen(false)}
                        >
                            <Compiler />
                        </Dialog>
                        <CreateIcon
                            onClick={() => setIsWhiteBoardOpen(true)}
                            style={{
                                marginBottom: "40px",
                                cursor: "pointer",
                                fontSize: "40px",
                                color: "white",
                            }}
                        />

                        <Dialog
                            header="White Board"
                            visible={isWhiteBoardOpen}
                            maximizable
                            style={{ width: "50vw", background: 'white', padding: "10px  0 0 0 " }}
                            onHide={() => setIsWhiteBoardOpen(false)}
                        >
                            <Canvas />
                        </Dialog>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: "flex" }}>
                <div
                    className="myCallContainer"
                    ref={myMeeting}
                    style={{ flex: 1 }}
                ></div>
            </div>
        </div>
    );
}
