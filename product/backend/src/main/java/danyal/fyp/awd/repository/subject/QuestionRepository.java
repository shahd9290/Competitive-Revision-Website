package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> getQuestionByTopic(Topic topic);
}
