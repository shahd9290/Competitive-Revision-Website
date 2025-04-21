package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.dto.admin.question.QuestionDataDto;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing {@link Question} entities.
 * Provides methods for retrieving questions by topic and fetching detailed question data.
 *
 * @author Danyal Shah
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    /**
     * Retrieves a list of questions associated with a specific topic.
     *
     * @param topic the topic to filter questions by
     * @return a list of questions associated with the specified topic
     */
    List<Question> getQuestionByTopic(Topic topic);

    /**
     * Retrieves detailed data about questions, including the question text, answer, marks,
     * subject, and topic.
     *
     * @return a list of {@link QuestionDataDto} containing detailed question information
     */
    @Query("select new danyal.fyp.awd.dto.admin.question.QuestionDataDto(" +
            "q.id, q.question, q.answer, q.marks, s.name, t.name) " +
            "from Question q " +
            "left join q.topic t " +
            "left join t.subject s")
    List<QuestionDataDto> getQuestionData();
}
