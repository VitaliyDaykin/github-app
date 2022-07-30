import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export function UserRepository() {
    const { user } = useParams();
    console.log(user);

    return (
        <>
            <div>UserRepository</div>
        </>
    );
}
