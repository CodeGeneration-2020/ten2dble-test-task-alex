export type IInput = {
  [key: string]: string;
}

export type TErrors = {
  [key: string]: boolean;
}

export type IAvgData = {
  tries: number;
  score: number;
}

export type IState = {
  inputValue: string,
  error: boolean, 
  step: number,
  question: string,
  score: number
}

