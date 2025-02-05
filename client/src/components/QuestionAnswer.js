/* 
Plan 
- users types in question clicks submit
- sends question to server
- server runs question through openai 
- sends the outcome of the question back
- setAnswer to response fromm server
*/

import { useState } from "react";

export function QuestionAnswer() {
  //   const [answer, setAnswer] = useState("Waiting for you question");
  const [question, setQuestion] = useState("");

  const handleQuestionText = (e) => {
    setQuestion(e.target.value);
    console.log(question);
  };

  const handleQuestionSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3047/user-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Data sent successfully to server:", data);
    } catch (error) {
      console.error("Error sending data to server");
    }
  };

  return (
    <section className="container">
      <div className="questionContainer">
        <label htmlFor="question">Ask me anything</label>
        <textarea
          onChange={handleQuestionText}
          id="question"
          name="question"
          rows="5"
          cols="33"
          required
        />
        <button type="submit" onClick={handleQuestionSubmit}>
          Ask Away!
        </button>
      </div>
      <div className="answerContainer">
        <p>Your answer will show here:</p>
        {/* <p>{answer}</p> */}
      </div>
    </section>
  );
}
