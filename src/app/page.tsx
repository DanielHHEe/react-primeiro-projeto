"use client";

import { questions } from "@/componentes/questions";
import { useState } from "react";

const Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [resultado, setresultado] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const loadNextQuestions = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setIsAnswered(false);
    } else {
      setresultado(true);
    }
  };

  const handleClick = (answerIndex: number) => {
    if (isAnswered) return;

    const correctAnswerIndex = questions[currentQuestion].answer;
    const isCorrectAnswer = answerIndex === correctAnswerIndex;
    
    setIsCorrect(isCorrectAnswer);
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (isCorrectAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      loadNextQuestions();
    }, 3000);
  };

  const reniciarquiz = () => {
    setIsAnswered(false);
    setCurrentQuestion(0);
    setresultado(false);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
  };

  if (resultado) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-96 h-auto bg-white relative rounded-md p-4">
          <h1 className="text-black font-bold">Fim do Quiz!</h1>
          <p className="text-black">Você completou o quiz!</p>
          <p className="text-black">Você acertou {correctAnswers} de {questions.length} perguntas.</p>
          <button onClick={reniciarquiz} className="px-3 py-2 rounded-md bg-blue-800 text-white">Reniciar Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-96 h-auto bg-white relative rounded-md p-4">
        <h1 className="text-black font-bold">Quiz de conhecimentos gerais</h1>
        <hr className="mt-2 border-t border-gray-400" />
        <div className="mt-4">
          <h1 className="text-black">
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </h1>
        </div>

        <div className="mt-4">
          {questions[currentQuestion].options.map((option, index) => (
            <div
              key={index}
              className={`w-full mt-2 rounded-md p-2 cursor-pointer ${
                selectedAnswer === index
                  ? index === questions[currentQuestion].answer
                    ? "bg-green-400"
                    : "bg-red-400"
                  : "bg-blue-400"
              }`}
              onClick={() => handleClick(index)}
            >
              <p className="text-black">{option}</p>
            </div>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-4">
            <p className={`text-black font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "Resposta correta!" : `Resposta errada. A resposta correta é: ${questions[currentQuestion].options[questions[currentQuestion].answer]}`}
            </p>
          </div>
        )}

        <hr className="mt-6 border-t border-gray-400" />
        <div className="flex justify-center mt-2">
          <p className="text-black text-xs">
            {currentQuestion + 1} de {questions.length} pergunta{questions.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;