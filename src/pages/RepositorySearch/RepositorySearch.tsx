import React, { useEffect, useState } from "react";
import { useSearchUsersQuery } from "../../store/github/github.api";
import { useDebounce } from "../../hooks/debounce";
import "./RepositorySearch.scss";

export function RepositorySearch() {
    const [search, setSearch] = useState("");
    const debounced = useDebounce(search);
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
    });

    useEffect(() => {
        console.log(debounced);
    }, [debounced]);

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
                    <ul className="repository-search__list">
                        {isLoading && (
                            <p className="repository-search__loading"></p>
                        )}
                        {data?.map((user) => (
                            <li
                                className="repository-search__item"
                                key={user.id}
                            >
                                {user.login}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
