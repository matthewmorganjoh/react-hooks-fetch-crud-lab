import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  }, []);

  const handleDelete = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  };

  const handleUpdate = (questionId, correctIndex) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    };

    fetch(`http://localhost:4000/questions/${questionId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questionId ? { ...question, correctIndex } : question
          )
        );
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
