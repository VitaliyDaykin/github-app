import React from "react";

import { IRepo } from "../../models/models";
import "./UserCard.scss";

export function UserCard({ user }: { user: IRepo }) {
    return (
        <div className="repo-card">
            <div className="repo-card__img">
                <img src={user.owner.avatar_url} alt="" />
            </div>
            <p className="repo-card__title">
                Name of the repository: {user.name}
            </p>
            <div>
                <p className="repo-card__text">Fork: {user.forks}</p>
                <p className="repo-card__text">
                    Stars: {user.stargazers_count}
                </p>
            </div>
        </div>
    );
}
