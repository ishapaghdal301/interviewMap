import React from "react";

import "../assets/styles/Repositories.css";
import Repository from "../components/Repository";

const Repositories = ({ repos, user }) => (
    <section className="repositories">
        {repos.map((repo) => (
            <Repository key={repo.id} repo={repo} user={user} />
        ))}
    </section>
);

export default Repositories;
