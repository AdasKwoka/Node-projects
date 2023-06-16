const question = document.querySelector('.question');
const answerElements = document.querySelectorAll('.answer');

const fillQuestionElements = ({ question, answers }) => {
  question.innerText = question;
  answerElements.forEach((answerElement, index) => {
    answerElement.innerText = answers[index];
  })
}

const showNextQuestion = async () => {
  const response = await fetch('/question', {
    method: 'GET',
  })
  const data = await response.json();
  
  fillQuestionElements(data);
}

showNextQuestion()