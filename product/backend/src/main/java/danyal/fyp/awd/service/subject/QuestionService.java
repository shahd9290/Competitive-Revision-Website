package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.admin.question.QuestionDataDto;
import danyal.fyp.awd.dto.subject.QuestionGetDto;
import danyal.fyp.awd.exception.QuestionException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final SubjectTopicService subjectTopicService;
    private final QualificationService qualificationService;

    public void addQuestion(String questionString, String answer, int marks, String topicString, String qualification) throws Exception {

        Qualification qual = qualificationService.getQualification(qualification);
        Topic topic;
        if ((topic = subjectTopicService.getTopic(topicString, qual.getId())) == null) {
            throw new TopicException("Topic not found");
        }
        Question question = new Question();

        question.setQuestion(questionString);
        question.setAnswer(answer);
        question.setMarks(marks);
        question.setTopic(topic);

        questionRepository.save(question);
    }

    public QuestionGetDto getQuestions(int topicId) throws Exception {
        Topic topic;
        if ((topic = subjectTopicService.getTopic(topicId)) == null)
            throw new TopicException("Topic not found");

        List<Question> questions = questionRepository.getQuestionByTopic(topic);

        if (questions.isEmpty())
            throw new QuestionException("No Questions for this topic!");

        Collections.shuffle(questions);
        if (questions.size() > 10)
            questions = questions.subList(0, 10);

        int totalMarks = 0;
        for (Question question : questions) {
            totalMarks += question.getMarks();
        }

        return new QuestionGetDto(questions, totalMarks);
    }

    public List<QuestionDataDto> getAllQuestions() {
        return questionRepository.getQuestionData();
    }

    public void deleteQuestion(int id) {
        questionRepository.deleteById(id);
    }

    public void editQuestion(int id, String question, String answer, Integer marks) {
        Question question_ = questionRepository.findById(id).get();
        question_.setQuestion(question);
        question_.setAnswer(answer);
        question_.setMarks(marks);
        questionRepository.save(question_);
    }

    public int countQuestions() {
        return (int) questionRepository.count();
    }
}
