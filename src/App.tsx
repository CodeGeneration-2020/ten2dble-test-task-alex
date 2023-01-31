import React, { Component } from "react";
import { connect } from "react-redux";

import QuestionsContainer from "./modules/questions/questions.component";
import { IInitialState } from "./redux/slices/user-slices.types";
import * as Styled from "./app.styled";

interface IAppProps {
  data: IInitialState;
}

class App extends Component<IAppProps> {
  state = {
    averageScore: 0,
  };

  componentWillMount() {
    this.setState({ averageScore: this.props.data.avgScore });
  }
  componentDidUpdate(prevProps: Readonly<IAppProps>): void {
    if (prevProps.data.avgScore !== this.props.data.avgScore) {
      this.setState({ averageScore: this.props.data.avgScore });
    }
  }

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <Styled.Text>
            Your Average Score: {this.state.averageScore.toFixed(2)}
          </Styled.Text>
          <QuestionsContainer />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: IInitialState) => {
  return { data: state };
};

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
