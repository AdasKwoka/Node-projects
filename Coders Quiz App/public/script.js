const questionElement = document.querySelector('.question');
const answerElements = document.querySelectorAll('.answer');
const goodAnswerElement = document.querySelector('.goodAnswers');
const gameBoard = document.querySelector('.gameBoard');
const subTitle = document.querySelector('h2');
const callToAFriendButton = document.querySelector('.callToFriend');
const fiftyFiftyButton = document.querySelector('.fiftyFifty');
const hintElement = document.querySelector('.hint');
const questionToCrowdButton = document.querySelector('.askTheCrowd');

const fillQuestionElements = ({ question, answers, winner, looser }) => {
  if (winner) {
    gameBoard.style.display = 'none';
    subTitle.innerText = 'You win!';

    return;
  }

  if (looser) {
    gameBoard.style.display = 'none';
    subTitle.innerText = 'You lose! Try again!';

    return;
  }

  questionElement.innerText = question;
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

const handleAnswerFeedback = (data) => {
  goodAnswerElement.innerText = data.goodAnswers;

  showNextQuestion();
}

const sendAnswer = async (answerIndex) => {
  const response = await fetch(`/answer/${answerIndex}`, {
    method: 'POST',
  })
  const data = await response.json();

  handleAnswerFeedback(data);
}

answerElements.forEach((answerElement) => {
  answerElement.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.index;
    
    sendAnswer(answerIndex)
  })
})

const handleHint = ({message}) => {
  hintElement.innerText = message;
}

const callToAFriend = async () => {
  const response = await fetch('/help/friend', {
    method: 'GET',
  })
  const data = await response.json();
  
  handleHint(data);
}

callToAFriendButton.addEventListener('click', callToAFriend);

const handleFiftyFiftyAnswer = ({ message, answersToRemove }) => {
  if ( typeof message === 'string' ) {
    handleHint({ message });
  } else {
    answerElements.forEach((answerElement) => {
      if (answersToRemove.indexOf(answerElement.innerText) > -1) {
        answerElement.innerText = '';
      }
    })
  }
}

const fiftyFifty = async () => {
  const response = await fetch('/help/fifty', {
    method: 'GET',
  })
  const data = await response.json();
  
  handleFiftyFiftyAnswer(data);
}

fiftyFiftyButton.addEventListener('click', fiftyFifty);

const handleQuestionToCrowd = ({ message, charts }) => {
  if ( typeof message === 'string' ) {
    handleHint({ message });
  } else {
    charts.forEach((chart, index) => {
      answerElements[index].innerText += `: ${chart}%` 
    })
  }
}

const questionToCrowd = async () => {
  const response = await fetch('/help/crowd', {
    method: 'GET',
  })
  const data = await response.json();
  
  handleQuestionToCrowd(data)
}

questionToCrowdButton.addEventListener('click', questionToCrowd);

showNextQuestion()