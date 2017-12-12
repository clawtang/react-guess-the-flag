import React, { Component } from 'react';
import shuffle from 'shuffle-array';

import GameInput from './GameInput';
import AnswerText from './AnswerText';
import Flag from './Flag';
import './GameBoard.css';

class GameBoard extends Component {
  state = {
    newGame: true,
    questions: [
      {
        name: 'norway',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/2000px-Flag_of_Norway.svg.png'
      },
      {
        name: 'usa',
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png'
      },
      {
        name: 'canada',
        flag: 'https://www.theflagstore.ca/store/wp-content/uploads/2012/04/IMG_5851_2lowres.jpg',
        correct: true
      },
      {
        name: 'assholes',
        flag: 'https://cdn20.patchcdn.com/users/22872566/20170208/114428/styles/T800x600/public/article_images/confederateflag-1486572173-6918.jpg'
      }
    ]
  }

  componentDidMount = () => {
    this.fetchCountries();
  }

  fetchCountries = () => {
    const url = 'https://restcountries.eu/rest/v2/all';
    return fetch(url)
    .then(data => data.json())
    .then(countries => this.setState({countries}));
  }

  startGame = () => {
    this.showQuestion();
    this.setState({newGame: false});
  }

  showQuestion = () => {
    // shuffle array and mark correct answer
    const questions = shuffle.pick(this.state.countries, {'copy': true, 'picks': 4}).map((q, idx) => {
      if (idx === 0) {
        return {...q, correct: true};
      }
      return q;
    });
    // save correct answer
    const correct = questions[0];
    // mix the names for the input display
    const mixed = shuffle(questions, {copy: true});
    const answering = true;
    this.setState({questions, correct, mixed, answering});
  }

  onSubmit = ({selectedOption}) => {
    const {correct, mixed} = this.state;
    let msg;
    if (mixed[selectedOption].correct) {
      msg = `Correct!: ${correct.name}`
      this.setState({answerText: msg})
    } else {
      msg = `Incorrect! Correct Answer: ${correct.name}`
      this.setState({answerText: msg})
    }
    const answering = false;
    this.setState({answering});
  }

  render() {
    const {newGame, questions, mixed, answering} = this.state;
    const flag = questions[0].flag;

    // set initial display for game and return immediately for new game
    let game = <button style={{display: 'block', margin: '2em auto'}} onClick={this.startGame}>New Game</button>;
    if (newGame) {
      return <div className="gameboard">{game}</div>;
    }

    // determine if asking or answering a question to set display
    if (answering) {
      game = <GameInput questions={mixed} onSubmit={this.onSubmit} />;
    } else {
      game = <AnswerText answerText={this.state.answerText} onClick={this.startGame} />;
    }

    return (
      <div className="gameboard">
        {game}
        <Flag flagImageUrl={flag} />
      </div>
    );
  }
}

export default GameBoard;
