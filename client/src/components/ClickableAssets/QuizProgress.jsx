import { useQuizStore } from "../../store";
import "./QuizProgress.css";

const QuizProgress = () => {
  const { questions } = useQuizStore();
  const completedCount = questions.filter(q => q.isDone).length;
  const totalCount = questions.length;

  return (
    <div className="quiz-progress">
      {completedCount}/{totalCount} Completed
    </div>
  );
};

export default QuizProgress;
