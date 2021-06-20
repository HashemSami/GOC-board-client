import { FC } from "react";
import { AppContainer } from "./App.styles";
import HomePage from "./pages/home-page/HomePage.component";
import Header from "./components/header/Header.component";
import Footer from "./components/footer/Footer.component";

const App: FC = () => {
  return (
    <AppContainer className="App">
      <Header />
      <HomePage />
      <Footer />
    </AppContainer>
  );
};

export default App;
