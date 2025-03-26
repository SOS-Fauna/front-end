import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>  {/* Router deve englobar tudo! */}
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
