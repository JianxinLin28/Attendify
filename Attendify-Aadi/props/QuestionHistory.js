export class Question {
  #id;
  #date;
  #title;
  #context;
  #explanation;
  #choices;
  #correctAnswer
  #originalResponse;

  /*
    id: string, must be unique for all questions
    date: string, the date question is posted
    explanation: string, the explanation to the question & answer
    choices: string[], the options for question
    correctAnswer: char, use A, B, C, D
    originalResponse: char, use A, B, C, D, this is the answer provided by student
  */

  constructor(id, date, title, context, explanation, choices, correctAnswer, originalResponse) {
    this.#id = id;
    this.#date = date;
    this.#title = title;
    this.#context = context;
    this.#explanation = explanation;
    this.#choices = choices;
    this.#correctAnswer = correctAnswer;
    this.#originalResponse = originalResponse;

    this.getID = () => this.#id;
    this.getDate = () => this.#date;
    this.getTitle = () => this.#title;
    this.getContext = () => this.#context;
    this.getExplanation = () => this.#explanation;
    this.getChoices = () => this.#choices;
    this.getCorrectAnswer = () => this.#correctAnswer;
    this.getOriginalResponse = () => this.#originalResponse;
    this.IsCorrect = () => this.#correctAnswer === this.#originalResponse;

    this.getPrettyCorrectAnswer = () => {
      return this.prettyOption(this.getCorrectAnswer(), this.#choices);
    }

    this.getPrettyOriginalResponse = () => {
      return this.prettyOption(this.getOriginalResponse(), this.#choices);
    }

    this.getPrettyChoices = () => {
      return ['A', 'B', 'C', 'D'].map(x => {
        return this.prettyOption(x, this.#choices)
      })
    }

    /*
      indicator: char, use A, B, C, D
      option: string, an option for question
    */
    this.prettyOption = (indicator, option) => {
      switch(indicator)
      {
        case 'A':
          return indicator + '. ' + option[0];
        case 'B':
          return indicator + '. ' + option[1];
        case 'C':
          return indicator + '. ' + option[2];
        case 'D':
          return indicator + '. ' + option[3];
        default:
          return '';
      }
    }
  }
}

export function GetExampleQuestionList()
{
  return [
    {
      question: new Question('11222023CS220Q1', 
                              '11/7', 
                              'Q1',
                              'What is the speed of light?', 
                              'To be more precise, it is 299,792,458 m/s, often denoted by the symbol "c".',
                              ['3 * 10^8 m/s', '2.3 * 10^8 m/s', '3 * 10^9 m/s', '2.2 * 10^8 m/s'],
                              'A',
                              'A'
                            )
    },
    {
      question: new Question('11222023CS220Q2',
                              '11/7',
                              'Q2',
                              'What is the primary function of a compiler in the context of programming languages?',
                              'A compiler is a software tool that translates high-level programming languages (like C, C++, Java) into machine code or an intermediate code. The purpose is to enable the computer\'s CPU to execute the program.',
                              ['Execute the program', 'Debug the program', 'Translate source code into machine code', 'Manage memory allocation'],
                              'C',
                              'A'
                            )
    },
  ];
}
