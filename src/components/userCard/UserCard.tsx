import React from "react";
import "./UserCard.scss";

export function UserCard({ currentUserData }: { currentUserData: any }) {
    return (
        <a href={currentUserData.html_url} target="_blank">
            <div className="user-biographi">
                <div className="user-biographi__avatar">
                    <img src={currentUserData.avatar_url} />
                </div>
                <ul className="user-biographi__list">
                    <li>Name: {currentUserData.name}</li>
                    <li>UserName: {currentUserData.login}</li>
                    <li>Email: {currentUserData.email}</li>
                    <li>Location: {currentUserData.location}</li>
                    <li>Join Date: {currentUserData.created_at}</li>
                    <li>Followers: {currentUserData.followers}</li>
                    <li>Following: {currentUserData.following}</li>
                </ul>
            </div>
        </a>
    );
}
