import "./App.css";
import { Header } from "./common/Header/Header";
import { Body } from "./pages/Body/Body";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <>
      <div className="margeMenuSuperior">
        <Header />
        <Body />
      </div>
    </>
  );
}

export default App;
