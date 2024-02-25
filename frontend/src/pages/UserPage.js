import React, { useState, useEffect } from "react";
import axios from "axios";

import UserInfos from "../components/UserInfo";
import Repositories from "./RepositoryPage";
import Tabs from "../components/Tab";

import Loading from "../components/Loading";
import "../assets/styles/UserPage.css";

function UserPage() {
    const [user, setUser] = useState();
    const [repositories, setRepositories] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchUser();
        fetchRepositories();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    async function getUserData(userName) {
        const response = await axios.get(
            `https://api.github.com/users/${userName}`
        );
        return response;
    }

    async function getUserRepositories(userName) {
        const repositories = await axios.get(
            `https://api.github.com/users/${userName}/repos`
        );
        return repositories;
    }

    async function fetchUser() {
        const { data } = await getUserData(searchValue || "manthan161203");
        setUser(data);
    }

    async function fetchRepositories() {
        const { data } = await getUserRepositories(searchValue || "manthan161203");
        setRepositories(data);
    }

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        fetchUser();
        fetchRepositories();
    };

    return (
        <>
            {user ? (
                <>
                    {/* <Navbar2 user={user} /> */}
                    <div className="container-userpage">
                        <UserInfos user={user} />
                        <div className="">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter GitHub username"
                                            value={searchValue}
                                            onChange={handleSearchInputChange}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-primary ml-2"
                                                type="button"
                                                onClick={handleSearch}
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Tabs repos={repositories} user={user} />
                        <Repositories repos={repositories} user={user} />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default UserPage;
