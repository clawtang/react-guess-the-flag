import React, { Component } from 'react';
import { func, object, arrayOf } from 'prop-types';

import './GameInput.css';

class GameInput extends Component {
  state = {
    selectedOption: 0
  }

  static propTypes = {
    questions: arrayOf(object).isRequired,
    onSubmit: func.isRequired
  }

  handleOptionChange = (e) => {
    const selectedOption = parseInt(e.target.value, 10);
    this.setState({selectedOption});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const {selectedOption} = this.state;
    const choices = this.props.questions.map((q, index) => {
      return (
        <div className="radio" key={index}>
          <label>
            <input
              type="radio"
              value={index}
              checked={selectedOption === index}
              onChange={this.handleOptionChange}
            />
            {q.name}
          </label>
        </div>
      );
    });
    return (
      <div className="form-group">
        <form onSubmit={this.handleSubmit}>
          {choices}
          <button>Guess</button>
        </form>
      </div>
    );
  }
}

export default GameInput;
