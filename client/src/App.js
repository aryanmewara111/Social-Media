import { useEffect, useReducer, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggenInRoutes from "./routes/NotLoggenInRoutes";
import {
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
} from "./pages";
import {
  CreatePostPopup,
  RoomInput,
  FullScreen
} from "./components";
import { postsReducer } from "./functions/reducers";
import Loader from "./styles/loader/Loader";

function App() {
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [showPreview, setShowPreview] = useState(false);
  const [type, setType] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [postImages, setPostImages] = useState([]);
  const [coverType, setCoverType] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const isLoading = false;

  useEffect(() => {
    document.body.style.backgroundColor = `${darkTheme ? "#18191a" : "#f0f2f5"}`
  }, [darkTheme]);

  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: ""
  });

  useEffect(() => {
    // if (!isLoading && user) {
    const getAllPosts = async () => {
      try {
        dispatch({
          type: "POSTS_REQUEST"
        });
        const { data } = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/getAllPosts`);
        // const { data } = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/getAllPosts`, {
        //   headers: {
        //     Authorization: `Bearer ${user?.token}`
        //   }
        // });
        dispatch({
          type: "POSTS_SUCCESS",
          payload: data
        });
      }
      catch (error) {
        dispatch({
          type: "POSTS_ERROR",
          payload: error.response.data.message
        });
      }
    };
    getAllPosts();
    // }
  }, []);
  // }, [isLoading, user]);

  return (
    <div className={darkTheme ? "dark" : ""}>
      {postVisible &&
        <CreatePostPopup type={type} showPreview={showPreview} setShowPreview={setShowPreview} user={user} setPostVisible={setPostVisible} posts={posts} dispatch={dispatch} />
      }
      {roomOpen && <RoomInput setRoomOpen={setRoomOpen} />}
      {fullscreen &&
        <FullScreen setFullscreen={setFullscreen} postImages={postImages} slideNumber={slideNumber} setSlideNumber={setSlideNumber} coverType={coverType} setCoverType={setCoverType}
        />}
      {isLoading
        ? <Loader />
        : (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route element={<LoggedInRoutes />}>
                <Route path="/" element={
                  <Home
                    setType={setType}
                    setShowPreview={setShowPreview}
                    loading={loading}
                    posts={posts}
                    error={error}
                    setPostVisible={setPostVisible}
                    setRoomOpen={setRoomOpen}
                    setFullscreen={setFullscreen}
                    setSlideNumber={setSlideNumber}
                    setPostImages={setPostImages}
                    setCoverType={setCoverType}
                  />
                }
                  exact
                />
                <Route path="/profile" element={<Profile setFullscreen={setFullscreen} setSlideNumber={setSlideNumber} setPostImages={setPostImages} />} exact />
                <Route path="/profile/:username" element={<Profile setFullscreen={setFullscreen} setSlideNumber={setSlideNumber} setPostImages={setPostImages} />} exact />
                <Route path="/friends" element={<Friends setPostVisible={setPostVisible} />} exact />
                <Route path="/friends/:type" element={<Friends setPostVisible={setPostVisible} />} exact />
                <Route path="/activate/:token" element={<Activate />} exact />
                <Route path="/room" element={<RoomEnter setRoomOpen={setRoomOpen} />} exact />
                <Route path="/room/:roomID" element={<Room />} exact />
              </Route>
              <Route element={<NotLoggenInRoutes />}>
                <Route path="/login" element={<Login />} exact />
              </Route>
              <Route path="/*" element={<Error />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/privacy" element={<Privacy />} exact />
              <Route path="/terms" element={<Terms />} exact />
              <Route path="/cookies" element={<Cookies />} exact />
            </Routes>
          </Suspense>
        )}
    </div>
  );
}

export default App;
