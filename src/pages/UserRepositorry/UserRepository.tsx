import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UserCard } from "../../components/userCard/UserCard";
import { getUserAdditionalInfo } from "../../store/github/github.slice";
import "./UserRepository.scss";

export function UserRepository() {
    const dispatch = useDispatch<any>();
    const { user } = useParams();
    const usersList = useSelector((state: any) => state.github.usersList);
    const isLoading = useSelector((state: any) => state.github.isLoading);
    const currentUserData = useSelector(
        (state: any) => state.github.currentUserData
    );
    const currentUser = usersList.find((item: any) => item.login === user);

    console.log(currentUserData.user_repos);

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserAdditionalInfo(currentUser));
        }
    }, []);

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <div className="repository-user">
            <h2 className="repository-user__title">UserRepository</h2>

            {currentUserData && (
                <div className="repository-user__user-card">
                    <UserCard currentUserData={currentUserData} />

                    {currentUserData.user_repos.map((repo: any) => {
                        return (
                            <div
                                className="repository-user__rupos"
                                key={repo.id}
                            >
                                <h5>Name: {repo.name}</h5>
                                <div>
                                    <p>Forks: {repo.forks}</p>
                                    <p>Stars: {repo.watchers}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
