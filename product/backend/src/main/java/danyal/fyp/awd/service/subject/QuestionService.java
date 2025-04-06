package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.admin.question.QuestionAddDto;
import danyal.fyp.awd.dto.admin.question.QuestionDataDto;
import danyal.fyp.awd.dto.admin.question.QuestionEditDto;
import danyal.fyp.awd.dto.subject.QuestionGetDto;
import danyal.fyp.awd.exception.QuestionException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.QuestionRepository;
import danyal.fyp.awd.service.admin.LogService;
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
    private final LogService logService;

    private final String ADD_QUESTION = "Created New %s Question: Question: %s, Answer: %s, Marks: %d";
    private final String EDIT_QUESTION = "Edited %s Question: Question: %s -> %s, Answer: %s -> %s, Marks: %d -> %d";
    private final String DELETE_QUESTION = "Deleted %s Question: Question: %s, Answer: %s Marks: %d";

    public void addQuestion(QuestionAddDto questionAddDto, String token) throws Exception {
        Qualification qual = qualificationService.getQualification(questionAddDto.qualification());
        Topic topic;
        if ((topic = subjectTopicService.getTopic(questionAddDto.topic(), qual.getId())) == null) {
            throw new TopicException("Topic not found");
        }
        Question question = new Question();

        question.setQuestion(questionAddDto.question());
        question.setAnswer(questionAddDto.answer());
        question.setMarks(questionAddDto.marks());
        question.setTopic(topic);

        questionRepository.save(question);
        logService.addLog(token, ADD_QUESTION.formatted(topic.getName(), questionAddDto.question(), questionAddDto.answer(), questionAddDto.marks()));
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

    public void deleteQuestion(int id, String token) {
        Question question = questionRepository.findById(id).get();
        questionRepository.deleteById(id);
        logService.addLog(token, DELETE_QUESTION.formatted(question.getTopic().getName(), question.getQuestion(), question.getAnswer(), question.getMarks()));
    }

    public void editQuestion(QuestionEditDto questionEditDto, String token) {
        Question question_ = questionRepository.findById(questionEditDto.id()).get();
        String oldQuestion = question_.getQuestion();
        String oldAnswer = question_.getAnswer();
        int oldMarks = question_.getMarks();
        question_.setQuestion(questionEditDto.question());
        question_.setAnswer(questionEditDto.answer());
        question_.setMarks(questionEditDto.marks());
        questionRepository.save(question_);
        logService.addLog(token, EDIT_QUESTION.formatted(
                question_.getTopic().getName(),
                questionEditDto.question(), oldQuestion,
                questionEditDto.answer(), oldAnswer,
                questionEditDto.marks(), oldMarks
        ));
    }

    public int countQuestions() {
        return (int) questionRepository.count();
    }
}
