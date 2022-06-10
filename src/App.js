import { Home,Purchases , Login, ProductDetail } from "./pages";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LoadingScreen, NavBar,Protected } from "./components/";
import { useSelector } from "react-redux";
import "./App.css";
import "./styles/nav-style.css"
import "./styles/home.css"

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      <NavBar/>
      <Container>
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Protected />}>
          <Route path="/purchases" element={<Purchases />} />
            
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
