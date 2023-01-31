import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";

import { QUESTIONS } from "../../questions";
import * as Styled from "./questions.styled";
import { updateAvg } from "../../redux/slices/user-slices";
import { IAvgData, IState } from "./questions.types";
import { IInitialState } from "../../redux/slices/user-slices.types";

interface IQuestions {
  data: IInitialState;
  updateUserAvg: (payload: IAvgData) => void;
}

class Questions extends Component<IQuestions> {
  state: IState = {
    inputValue: "",
    error: false,
    step: 0,
    question: QUESTIONS[0],
    score: 0,
  };

  changeHandler(value: string) {
    let inputValue = this.state.inputValue;
    let error = this.state.error;
    // disable the confirm button
    let isConfirmDisabled = false;

    // set the value from input
    inputValue = value;
    // case insensitive check is value yes or no
    error = !value.match(/^(?:Yes|No)$/gi);

    this.setState({ ...this.state, error, inputValue, isConfirmDisabled });
  }

  async clickHandler() {
    const inputValues = this.state.inputValue;
    let score = this.state.score;

    // increment score
    if (inputValues.match(/^(?:Yes)$/gi)) {
      score += 1;
    }

    if (this.state.step === 4) {
      // calculate the score
      const total = 100 * (score / Object.keys(QUESTIONS).length);

      // update average score
      this.props.updateUserAvg({ score: total, tries: 1 });

      // clear form
      this.setState({
        inputValue: "",
        error: false,
        step: 0,
        question: QUESTIONS[1],
        score: 0,
      });
    } else {
      this.setState({
        ...this.state,
        step: this.state.step + 1,
        question: QUESTIONS[this.state.step + 1],
        inputValue: "",
        error: false,
      });
    }
  }

  render() {
    return (
      <div>
        <Styled.Text>{this.state.question}</Styled.Text>
        <Styled.Input
          error={this.state.error}
          value={this.state.inputValue}
          onChange={(e) => this.changeHandler(e.target.value)}
          placeholder="Enter your answer here..."
        />
        <Styled.Button
          disabled={this.state.error || !this.state.inputValue}
          error={this.state.error}
          onClick={this.clickHandler.bind(this)}
        >
          {this.state.step === 4 ? "Confirm" : "Next"}
        </Styled.Button>
      </div>
    );
  }
}

const mapStateToProps = (state: IInitialState) => {
  return { data: state };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    updateUserAvg: (payload: IAvgData) => {
      dispatch(updateAvg(payload));
    },
  };
};

const ConnectedQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);

export default ConnectedQuestionsContainer;
