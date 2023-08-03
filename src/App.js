import "./styles.css";
import axios from "axios";
import Articles from "./components/Articles";

export default function App() {
  return (
    <div className="container">
      <Articles />
    </div>
  );
}
