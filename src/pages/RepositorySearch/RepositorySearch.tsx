import { useEffect, useState } from "react";
import { fetchSearchusers } from "../../store/github/github.slice";
import "./RepositorySearch.scss";

import { useNavigate } from "react-router-dom";
import { RepoCard } from "../../components/repoCard/RepoCard";
import { useDispatch, useSelector } from "react-redux";

export function RepositorySearch() {
    const dispatch = useDispatch<any>();

    const [search, setSearch] = useState("");
    const { usersList, isLoading } = useSelector((state: any) => state.github);
    const [dropdown, setDropdown] = useState(false);

    const naviage = useNavigate();

    useEffect(() => {
        setDropdown(usersList?.length > 0);
    }, [usersList]);

    const clickHandler = (username: string) => {
        naviage(`/${username}`);
    };

    return (
        <div className="repository-search">
            <h2 className="repository-search__title">RepositorySearch</h2>
            <div className="repository-search__showcase">
                <div className="repository-search__form">
                    <input
                        type="text"
                        placeholder="Search for Users"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                dispatch(fetchSearchusers(search));
                            }
                        }}
                    />

                    {dropdown && (
                        <ul className="repository-search__list">
                            {isLoading && (
                                <p className="repository-search__loading"></p>
                            )}
                            {usersList?.map((user: any) => (
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
