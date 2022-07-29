import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLazyGetUserReposQuery } from "../store/github/github.api";

export function UserRepository() {
    const { user } = useParams();
    console.log(user);

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
        useLazyGetUserReposQuery();
    return (
        <>
            <div>UserRepository</div>
            <div className="repository-search__user-rep">
                {areReposLoading && (
                    <p className="text-center">Repos are loading...</p>
                )}
                {repos?.map((repo) => (
                    <div key={repo.id}>
                        <a href={repo.html_url} target="_blank">
                            <img src={repo.owner.avatar_url} alt="" />

                            <p> {repo.forks}</p>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}
