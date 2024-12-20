// Main router
import { BrowserRouter as Router,Route,Routes} from "react-router-dom"
import SignInSide from "./sign-in-side/SignInSide"; // Your login screen
import Dashboard from "./dashboard/dashboard"; // Post-login screen


function AppRouter() {
        
        return (
        <Router>
          <Routes>
            <Route path="/" element={<SignInSide/>} />
            <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </Router>
  );
}
export default AppRouter;