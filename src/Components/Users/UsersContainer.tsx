import { useSelector } from "react-redux";
import { getIsFetching } from "../../redux/users-selectors";
import { Users } from "./Users";

import Preloader from "../Common/Preloader/Preloader";

export const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)

    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <Users/>
        </div>
    )
}