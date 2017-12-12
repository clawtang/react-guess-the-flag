import React from 'react';
import { string, func } from 'prop-types';

import './AnswerText.css';

AnswerText.propTypes = {
  answerText: string.isRequired,
  onClick: func.isRequired
}

function AnswerText(props) {
  return (
    <div className="answer-text">
      <p>{props.answerText}</p>
      <button onClick={props.onClick}>Next</button>
    </div>
  );
}

export default AnswerText;
