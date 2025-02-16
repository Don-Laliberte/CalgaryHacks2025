import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePhidget } from './PhidgetKit';
import './QuestionModal.css';

// Questions array from the old file
const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is the average decline in species populations since 1970?',
    options: ['50%', '69%', '30%', '80%'],
    correctAnswer: '69%'
  },
  {
    id: 2,
    type: 'true-false',
    question: 'Giant pandas are found in the wild in several countries across Asia.',
    correctAnswer: 'False',
    explanation: 'They are found only in China.'
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'Which organization has been key to the recovery of giant pandas for over 30 years?',
    options: ['UNESCO', 'WWF', 'Greenpeace', 'National Geographic'],
    correctAnswer: 'WWF'
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Which species became the face of a global campaign to stop the Don Sahong dam on the Mekong River?',
    options: ['Giant panda', 'Irrawaddy dolphin', 'Tiger', 'Elephant'],
    correctAnswer: 'Irrawaddy dolphin'
  },
  {
    id: 5,
    type: 'true-false',
    question: 'The campaign against the Don Sahong dam influenced more than a quarter of a million people worldwide.',
    correctAnswer: 'True'
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'What was the ambitious goal set at the first-ever global summit on a single species regarding wild tigers?',
    options: [
      'Halve the number of wild tigers by 2022',
      'Double the number of wild tigers by 2022',
      'Maintain current population levels',
      'End tiger poaching completely'
    ],
    correctAnswer: 'Double the number of wild tigers by 2022'
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'Approximately how many elephants are poached each year for their tusks?',
    options: ['5,000', '10,000', '20,000', '50,000'],
    correctAnswer: '20,000'
  },
  {
    id: 8,
    type: 'true-false',
    question: 'Most elephants are poached for their meat rather than their tusks.',
    correctAnswer: 'False',
    explanation: 'They are primarily poached for their ivory tusks.'
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'In which country did WWF help end the legal ivory trade?',
    options: ['Thailand', 'China', 'Kenya', 'India'],
    correctAnswer: 'China'
  },
  {
    id: 10,
    type: 'true-false',
    question: 'Namibia was the first African country to enshrine environmental protection in its constitution.',
    correctAnswer: 'True'
  },
  {
    id: 11,
    type: 'multiple-choice',
    question: 'Which U.S. administration revoked the executive order that sought to open Arctic waters to new drilling activities?',
    options: ['Obama', 'Trump', 'Biden', 'Bush'],
    correctAnswer: 'Biden'
  },
  {
    id: 12,
    type: 'true-false',
    question: "The 9th Circuit Court upheld the lower court's ruling that maintained the Obama-era protections for U.S. Arctic waters.",
    correctAnswer: 'True'
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'What is the primary threat to polar bears if oil and gas drilling expands in their Arctic habitat?',
    options: [
      'Loss of forested areas',
      'Direct contact with spilled oil and persistent toxic pollutants',
      'Increased competition for food',
      'Overfishing'
    ],
    correctAnswer: 'Direct contact with spilled oil and persistent toxic pollutants'
  },
  {
    id: 14,
    type: 'multiple-choice',
    question: 'Why are walruses especially important to many indigenous Arctic communities?',
    options: [
      'They are a major source of ivory',
      'They help provide food security and support cultural practices',
      'They boost tourism',
      'They are used as pack animals'
    ],
    correctAnswer: 'They help provide food security and support cultural practices'
  },
  {
    id: 15,
    type: 'true-false',
    question: 'Chimpanzee populations are stable and thriving across their range.',
    correctAnswer: 'False',
    explanation: 'They are being pushed toward extinction.'
  },
  {
    id: 16,
    type: 'multiple-choice',
    question: 'By approximately what percentage are gorilla populations declining each year?',
    options: ['1%', '3%', '5%', '10%'],
    correctAnswer: '3%'
  },
  {
    id: 17,
    type: 'multiple-choice',
    question: 'What is the global warming limit above pre‑industrial levels that we must strive not to exceed?',
    options: ['1.0°C', '1.5°C', '2.0°C', '2.5°C'],
    correctAnswer: '1.5°C'
  },
  {
    id: 18,
    type: 'true-false',
    question: 'To limit warming to 1.5°C, emissions must already be decreasing and need to be cut by almost half by 2030.',
    correctAnswer: 'True'
  },
  {
    id: 19,
    type: 'multiple-choice',
    question: 'According to the UNFCCC, what was the annual average of global climate finance flows in 2019–2020?',
    options: ['$500 billion', '$803 billion', '$1 trillion', '$600 billion'],
    correctAnswer: '$803 billion'
  },
  {
    id: 20,
    type: 'true-false',
    question: 'In 2020, fossil-fuel-related financial flows exceeded those for climate adaptation and mitigation.',
    correctAnswer: 'True'
  },
  {
    id: 21,
    type: 'multiple-choice',
    question: 'How many developing countries had initiated activities to develop National Adaptation Plans in 2019?',
    options: ['80', '100', '120', '153'],
    correctAnswer: '120'
  },
  {
    id: 22,
    type: 'true-false',
    question: 'Progress in meeting the 2020 disaster risk reduction target has been swift and effective.',
    correctAnswer: 'False'
  },
  {
    id: 23,
    type: 'multiple-choice',
    question: 'Which international agreement requires all countries to update their national climate action plans this year?',
    options: ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Rio Declaration'],
    correctAnswer: 'Paris Agreement'
  },
  {
    id: 24,
    type: 'true-false',
    question: 'Under the Paris Agreement, countries are mandated to accelerate the transition from fossil fuels to renewable energy.',
    correctAnswer: 'True'
  },
  {
    id: 25,
    type: 'multiple-choice',
    question: 'Who is Professor Celeste Saulo, as mentioned in the text?',
    options: [
      'Head of the IPCC',
      'Secretary-General of the World Meteorological Organization (WMO)',
      'UNFCCC Executive Secretary',
      'Director of IFAD'
    ],
    correctAnswer: 'Secretary-General of the World Meteorological Organization (WMO)'
  },
  {
    id: 26,
    type: 'true-false',
    question: 'According to Professor Saulo, climate breakdown is causing global weather systems to warp beyond recognition, leading to devastating impacts.',
    correctAnswer: 'True'
  },
  {
    id: 27,
    type: 'multiple-choice',
    question: 'Which organization is supporting the African diaspora in establishing an investment company for climate‑smart agriculture in Africa?',
    options: ['UNICEF', 'IFAD', 'UNFCCC', 'WMO'],
    correctAnswer: 'IFAD'
  },
  {
    id: 28,
    type: 'true-false',
    question: "Investments in Africa's climate-smart agriculture show that capital investments can successfully combine profitability with sustainable development.",
    correctAnswer: 'True'
  },
  {
    id: 29,
    type: 'multiple-choice',
    question: 'As Indonesia faces the pressures of climate change and deforestation, who is notably taking crucial roles in forest fire management?',
    options: ['Government officials', 'International agencies', 'Women', 'Local business owners'],
    correctAnswer: 'Women'
  },
  {
    id: 30,
    type: 'true-false',
    question: 'UNICEF is implementing climate‑resilient solutions to address water scarcity issues affecting children in Afghanistan.',
    correctAnswer: 'True'
  },
  {
    id: 31,
    type: 'multiple-choice',
    question: 'Which of the following is NOT mentioned as a benefit of progressing with climate action?',
    options: ['Creation of green jobs', 'Cleaner air', 'Sounder economies', 'Increased fossil fuel consumption'],
    correctAnswer: 'Increased fossil fuel consumption'
  },
  {
    id: 32,
    type: 'true-false',
    question: 'The current pace and scale of climate action plans are sufficient to effectively tackle climate change, according to the text.',
    correctAnswer: 'False'
  },
  {
    id: 33,
    type: 'multiple-choice',
    question: "What does the United Nations' call to action encourage individuals and groups to do?",
    options: [
      'Rely solely on national governments to tackle climate challenges',
      'Work together across sectors to address climate challenges and fulfill the Paris Agreement commitments',
      'Focus only on economic growth without considering environmental impacts',
      'Continue with fossil fuel dependency'
    ],
    correctAnswer: 'Work together across sectors to address climate challenges and fulfill the Paris Agreement commitments'
  },
  {
    id: 34,
    type: 'multiple-choice',
    question: 'Which of the following is NOT an impact of climate change on human health?',
    options: [
      'A. Warming temperatures',
      'B. Changes in precipitation',
      'C. Increased frequency of extreme weather events',
      'D. Improved air quality'
    ],
    correctAnswer: 'D. Improved air quality'
  },
  {
    id: 35,
    type: 'true-false',
    question: 'The severity of climate change health risks depends solely on where a person lives.',
    correctAnswer: 'False',
    explanation: 'Other factors such as individual sensitivity, exposure, and adaptive capacity also play a role.'
  },
  {
    id: 36,
    type: 'multiple-choice',
    question: 'Which population group is particularly vulnerable to extreme heat exposure?',
    options: [
      'A. Indoor office workers',
      'B. Outdoor workers',
      'C. Remote telecommuters',
      'D. People who primarily use public transportation'
    ],
    correctAnswer: 'B. Outdoor workers'
  },
  {
    id: 37,
    type: 'true-false',
    question: 'Urban areas are typically cooler than rural areas.',
    correctAnswer: 'False',
    explanation: 'Urban areas often experience the "urban heat island" effect.'
  },
  {
    id: 38,
    type: 'multiple-choice',
    question: 'Which cities have seen notable increases in death rates during heat waves?',
    options: [
      'A. New York, Los Angeles, Miami, Seattle',
      'B. St. Louis, Philadelphia, Chicago, Cincinnati',
      'C. Houston, Dallas, Atlanta, Phoenix',
      'D. Boston, San Francisco, Denver, Portland'
    ],
    correctAnswer: 'B. St. Louis, Philadelphia, Chicago, Cincinnati'
  },
  {
    id: 39,
    type: 'multiple-choice',
    question: 'Which pollutant is expected to increase in frequency due to warmer, stagnant air associated with climate change?',
    options: [
      'A. Carbon monoxide',
      'B. Ground-level ozone',
      'C. Lead',
      'D. Nitrogen'
    ],
    correctAnswer: 'B. Ground-level ozone'
  },
  {
    id: 40,
    type: 'true-false',
    question: 'Higher levels of ground-level ozone can damage lung tissue and reduce lung function.',
    correctAnswer: 'True'
  },
  {
    id: 41,
    type: 'multiple-choice',
    question: "Which of the following factors does NOT influence an individual's vulnerability to climate-related health risks?",
    options: [
      'A. Age',
      'B. Economic status',
      'C. Geographic location',
      'D. Hair color'
    ],
    correctAnswer: 'D. Hair color'
  },
  {
    id: 42,
    type: 'true-false',
    question: 'Climate change poses significant health risks only in developing countries.',
    correctAnswer: 'False',
    explanation: 'Wealthy nations also face significant risks.'
  },
  {
    id: 43,
    type: 'multiple-choice',
    question: 'What adaptive measure is mentioned as helping reduce heat-related deaths?',
    options: [
      'A. Increased outdoor activities',
      'B. Wider use of air conditioning',
      'C. Enhanced fossil fuel use',
      'D. Reducing water supply'
    ],
    correctAnswer: 'B. Wider use of air conditioning'
  },
  {
    id: 44,
    type: 'multiple-choice',
    question: 'As of 2014, approximately how many Americans lived in counties that did not meet national air quality standards?',
    options: [
      'A. 20 million',
      'B. 57 million',
      'C. 100 million',
      'D. 75 million'
    ],
    correctAnswer: 'B. 57 million'
  },
  {
    id: 45,
    type: 'true-false',
    question: 'Wildfires, which are expected to increase with climate change, contribute to particulate matter that can be carried long distances.',
    correctAnswer: 'True'
  },
  {
    id: 46,
    type: 'multiple-choice',
    question: 'Which vector-borne disease is associated with ticks whose range expands with rising temperatures?',
    options: [
      'A. West Nile virus',
      'B. Lyme disease',
      'C. Malaria',
      'D. Dengue fever'
    ],
    correctAnswer: 'B. Lyme disease'
  },
  {
    id: 47,
    type: 'true-false',
    question: 'Mosquitoes, which can spread West Nile virus, are influenced in their distribution by extreme temperatures.',
    correctAnswer: 'True'
  },
  {
    id: 48,
    type: 'multiple-choice',
    question: 'Which factor does NOT affect the spread of climate-sensitive vector-borne diseases?',
    options: [
      'A. Land use',
      'B. Socioeconomic conditions',
      'C. Access to healthcare',
      'D. Eye color'
    ],
    correctAnswer: 'D. Eye color'
  },
  {
    id: 49,
    type: 'true-false',
    question: 'Exposure to extreme heat is only a risk for populations in typically warm, southern regions.',
    correctAnswer: 'False',
    explanation: 'Populations in northern latitudes may be less prepared for unexpected heat events.'
  },
  {
    id: 50,
    type: 'multiple-choice',
    question: 'Which groups are specifically mentioned as having increased vulnerability to extreme heat?',
    options: [
      'A. Low-income households and older adults',
      'B. Teenagers and young adults',
      'C. Middle-income families',
      'D. Urban professionals with high-tech cooling systems'
    ],
    correctAnswer: 'A. Low-income households and older adults'
  },
  {
    id: 51,
    type: 'true-false',
    question: 'The overall impacts of climate change on human health depend on both environmental changes and the ability of public health systems and communities to adapt.',
    correctAnswer: 'True'
  }
];

const QuizItem = ({ question, onClose, onNext, isLastQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(0);
  const { phidget, isConnected } = usePhidget();

  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setIsCorrect(null);
    setShowExplanation(false);
    setHighlightedOption(0);
  }, [question.id]);

  useEffect(() => {
    let buttonHandler;
    
    if (isConnected) {
      if (question.type === 'true-false') {
        // True/false handler
        buttonHandler = async (buttonIndex, state) => {
          if (state) { // Button pressed
            const answer = buttonIndex === 5 ? 'True' : 'False'; // Green button (5) for True, Red button (0) for False
            handleAnswerSelect(answer);
          }
        };
      } else if (question.type === 'multiple-choice') {
        // Multiple-choice handler
        buttonHandler = async (buttonIndex, state) => {
          if (state) { // Button pressed
            if (buttonIndex === 0) { // Red button - move highlight
              setHighlightedOption((prev) => 
                (prev + 1) % question.options.length
              );
            } else if (buttonIndex === 5) { // Green button - select option
              handleAnswerSelect(question.options[highlightedOption]);
            }
          }
        };
      }

      // Set up button handlers
      phidget.digitalInput5.setOnStateChange(state => buttonHandler(5, state)); // Green button
      phidget.digitalInput0.setOnStateChange(state => buttonHandler(0, state)); // Red button
    }

    return () => {
      if (buttonHandler) {
        phidget.digitalInput5.setOnStateChange(null);
        phidget.digitalInput0.setOnStateChange(null);
      }
    };
  }, [isConnected, question.type, phidget, highlightedOption, question.options]);

  const handleAnswerSelect = async (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (isConnected) {
      await phidget.setGreenLED(false);
      await phidget.setRedLED(false);

      if (correct) {
        await phidget.setGreenLED(true);
      } else {
        await phidget.setRedLED(true);
      }

      setTimeout(async () => {
        await phidget.setGreenLED(false);
        await phidget.setRedLED(false);
      }, 2000);
    }
  };

  const renderAnswerOptions = () => {
    if (question.type === 'multiple-choice') {
      return (
        <div className="options-container">
          {isConnected && (
            <div className="phidget-instructions">
              Using Phidget Kit: Press Red button to move selection, Green button to confirm
            </div>
          )}
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer === option 
                    ? (isCorrect ? 'correct' : 'incorrect') 
                    : (isConnected && index === highlightedOption ? 'highlighted' : '')
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (question.type === 'true-false') {
      return (
        <div className="options-container">
          {isConnected && (
            <div className="phidget-instructions">
              Using Phidget Kit: Press Green button for True, Red button for False
            </div>
          )}
          <div className="true-false-grid">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer === option 
                    ? (isCorrect ? 'correct' : 'incorrect') 
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Question {question.id} of {questions.length}</h2>
          <p className="question-text">{question.question}</p>
        </div>

        <div className="modal-body">
          {renderAnswerOptions()}
          
          {showExplanation && (
            <div className={`explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>
              {question.explanation && <p>{question.explanation}</p>}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="button secondary" onClick={onClose}>
            Close
          </button>
          {showExplanation && !isLastQuestion && (
            <button className="button primary" onClick={onNext}>
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

QuizItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['multiple-choice', 'true-false']).isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string.isRequired,
    explanation: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired
};

const QuizContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = () => {
    setIsLoading(true);
    try {
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error starting quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="card">
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {currentQuestionIndex === null ? (
        <div className="card">
          <h2>Wildlife Conservation Quiz</h2>
          <p>Test your knowledge about wildlife conservation with this {questions.length}-question quiz!</p>
          <button className="button primary" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : (
        <QuizItem
          question={questions[currentQuestionIndex]}
          onClose={() => setCurrentQuestionIndex(null)}
          onNext={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-red-600">Something went wrong.</h2>
            <Button onClick={() => this.setState({ hasError: false })}>Try again</Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap your QuizContainer with ErrorBoundary
export default function QuizWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <QuizContainer />
    </ErrorBoundary>
  );
} 