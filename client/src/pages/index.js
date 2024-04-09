import { lazy } from "react";

const Home = lazy(() => import("./home"));
const Login = lazy(() => import("./login"));
const Profile = lazy(() => import("./profile"));
const Activate = lazy(() => import("./home/activate"));
const Reset = lazy(() => import("./reset"));
const Friends = lazy(() => import("./friends"));
const Room = lazy(() => import("./room"));
const Privacy = lazy(() => import("./data/Privacy"));
const Terms = lazy(() => import("./data/Terms"));
const Cookies = lazy(() => import("./data/Cookies"));
const RoomEnter = lazy(() => import("./room/RoomEnter"));
const Error = lazy(() => import("./error"));

export {
    Home,
    Login,
    Profile,
    Activate,
    Reset,
    Friends,
    Room,
    Privacy,
    Terms,
    Cookies,
    RoomEnter,
    Error
};