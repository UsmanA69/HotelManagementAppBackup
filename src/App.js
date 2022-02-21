import AppRouter from "./config/Router/AppRouter";
import { Provider } from "react-redux";
import myStore from "./config/Redux/Store";

function App() {
  return (
    <>
      <Provider store={myStore}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
