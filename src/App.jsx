import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Navbar from "./components/navbar/Navbar";
import AdminLogin from "./components/admin/AdminLogin";
import PrivateRout from "./components/PrivateRoute";
import AdminProfile from "./components/admin/AdminProfile";
import AddCandidate from "./components/admin/AddCandidate";
import AddElection from "./components/admin/AddElection";
import AllCandidates from "./components/home/AllCandidates";
import Vote from "./components/vote/Vote";
import AllResult from "./components/admin/AllResult";
import Result from "./components/admin/Result";
function App() {
  return (
    <div style={{ padding: "0", margin: "0" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRout />}>
            <Route element={<AdminProfile />} path="adminprofile" exact />
            <Route element={<AddCandidate />} path="addcandidate" exact />
            <Route element={<AddElection />} path="addelection" exact />
            <Route element={<AllResult />} path="allresult" exact />
            <Route element={<Result />} path="result/:electionId" exact />
          </Route>

          <Route exact path="/" element={<Home />}></Route>
          {/* <Route exact path="/about" element={<About />}></Route> */}
          <Route exact path="/login" element={<AdminLogin />}></Route>
          <Route path="/allcandidates/:id" element={<AllCandidates />} />
          <Route path="/vote/:electionId/:userId" element={<Vote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
