import React, { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: parseInt(formData.correctIndex),
      }),
    };

    fetch("http://localhost:4000/questions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answers[0]}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                answers: [
                  e.target.value,
                  prevFormData.answers[1],
                  prevFormData.answers[2],
                  prevFormData.answers[3],
                ],
              }))
            }
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answers[1]}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                answers: [
                  prevFormData.answers[0],
                  e.target.value,
                  prevFormData.answers[2],
                  prevFormData.answers[3],
                ],
              }))
            }
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answers[2]}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                answers: [
                  prevFormData.answers[0],
                  prevFormData.answers[1],
                  e.target.value,
                  prevFormData.answers[3],
                ],
              }))
            }
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answers[3]}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                answers: [
                  prevFormData.answers[0],
                  prevFormData.answers[1],
                  prevFormData.answers[2],
                  e.target.value,
                ],
              }))
            }
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;