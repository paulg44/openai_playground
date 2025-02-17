import "./App.css";
import CompareImage from "./components/CompareImage.js";
import { QuestionAnswer } from "./components/QuestionAnswer.js";

function App() {
  return (
    <div className="App">
      <QuestionAnswer />
      <CompareImage />
    </div>
  );
}

export default App;
