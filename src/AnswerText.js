import React from 'react';
import { string, func } from 'prop-types';

import './AnswerText.css';

AnswerText.propTypes = {
  answerText: string.isRequired,
  onClick: func.isRequired
}

function AnswerText({answerText, onClick}) {
  return (
    <div className="answer-text">
      <p>{answerText}</p>
      <button onClick={onClick}>Next</button>
    </div>
  );
}

export default AnswerText;
