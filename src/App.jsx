import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="register" element={<Registration />} />
          <Route exact path="login" element={<Login />} />

          {/* <Route path="results" element={<ResultsPage />}>
            <Route path=":result_id" element={<AccomodationCard />} />
          </Route> */}
          {/* <Route element={<ProtectedRouteReg auth={user} />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route> */}

          {/* <Route element={<ProtectedRoutes auth={user} />}>
            <Route path="home" element={<UserDashboard />}>
              <Route index element={<Bookings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="favourites" element={<Favourites />} />

              <Route path="profile" element={<UserProfile userId={user} />} />
            </Route>
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
