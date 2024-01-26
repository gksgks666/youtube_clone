import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from  './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Board/Home";
import Header from "./Components/Header/NavBar";
import VideoUploadPage from "./Components/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from './Components/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './Components/SubscriptionPage/SubscriptionPage';

function App() {
  return (
    <Router>
    <div>
      <Header/>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/video/upload" element={<VideoUploadPage/>}/>
          <Route exact path="/video/:videoId" element={<VideoDetailPage/>}/>
          <Route exact path="/subscription" element={<SubscriptionPage/>}/>
        </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
