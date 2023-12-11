import "./App.css";
import { Header } from "./common/Header/Header";
import { Body } from "./pages/Body/Body";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./pages/Footer/Footer";

function App() {
  return (
    <>
      <div className="margeMenuSuperior">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default App;
