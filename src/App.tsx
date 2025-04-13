import { RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import { router } from "./routes/routes";

const App = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
