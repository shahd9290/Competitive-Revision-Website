package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.exception.QuestionException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        // Idea is to calculate the answer for mathematical equations before returning to user. Pending evaluation, this may not be possible.
        // For other subjects the answer is required.
        if (!topic.getSubject().getName().equals("Mathematics")){
            if (!answer.isEmpty()){
                question.setAnswer(answer);
            }
            else {
                throw new QuestionException("Need an answer please!");
            }
        }

        question.setQuestion(questionString);
        question.setMarks(marks);
        question.setTopic(topic);

        questionRepository.save(question);
    }
}
