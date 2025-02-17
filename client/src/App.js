import "./App.css";
import QuestionAnswer from "./components/QuestionAnswer.js";
import CompareImage from "./components/CompareImage.js";

function App() {
  return (
    <div className="App">
      <h1>OpenAI API Testing</h1>
      <QuestionAnswer />
      <CompareImage />
    </div>
  );
}

export default App;
