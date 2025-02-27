package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.admin.QuestionDataDto;
import danyal.fyp.awd.dto.subject.QuestionGetDto;
import danyal.fyp.awd.exception.QuestionException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<Question> questionList = questionRepository.findAll();
        List<QuestionDataDto> questionDataDtoList = new ArrayList<>();

        for (Question question : questionList) {
            Topic t = question.getTopic();
            questionDataDtoList.add(new QuestionDataDto(question.getQuestion(), question.getAnswer(), question.getMarks(), t.getSubject().getName(), t.getName()));
        }
        
        return questionDataDtoList;
    }
}
