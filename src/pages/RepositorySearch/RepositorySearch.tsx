import React, { useEffect, useState } from "react";
import {
    useLazyGetUserReposQuery,
    useSearchUsersQuery,
} from "../../store/github/github.api";
import { useDebounce } from "../../hooks/debounce";
import "./RepositorySearch.scss";

import { useNavigate } from "react-router-dom";
import { RepoCard } from "../../components/repoCard/RepoCard";

export function RepositorySearch() {
    const [search, setSearch] = useState("");
    const debounced = useDebounce(search);
    const [dropdown, setDropdown] = useState(false);
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    });

    const naviage = useNavigate();

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
        useLazyGetUserReposQuery();

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0);
    }, [debounced, data]);

    const clickHandler = (username: string) => {
        fetchRepos(username);
    };

    return (
        <div className="repository-search">
            <h2 className="repository-search__title">RepositorySearch</h2>
            <div className="repository-search__showcase">
                {isError && (
                    <p className="repository-search__error">
                        Something went wrong...
                    </p>
                )}
                <div className="repository-search__form">
                    <input
                        type="text"
                        placeholder="Search for Github username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {dropdown && (
                        <ul className="repository-search__list">
                            {isLoading && (
                                <p className="repository-search__loading"></p>
                            )}
                            {data?.map((user) => (
                                <li
                                    className="repository-search__item"
                                    key={user.id}
                                    onClick={() => clickHandler(user.login)}
                                >
                                    <RepoCard repo={user} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
