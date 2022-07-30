import React from "react";

import { IUser } from "../../models/models";
import "./RepoCard.scss";

export function RepoCard({ repo }: { repo: IUser }) {
    return (
        <div className="repo-card">
            <div className="repo-card__img">
                <img src={repo.avatar_url} alt="" />
            </div>
            <h3 className="repo-card__title">{repo.login}</h3>
            <div className="repo-card__text">
                Repositories: {repo.repos_url.length}
            </div>
        </div>
    );
}
