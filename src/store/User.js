import {useStoreState} from "pullstate";
import {UserStore} from "./UserStore";

export function GetUSer() {
    const User = useStoreState(UserStore, s => s.User);
    return User;
}