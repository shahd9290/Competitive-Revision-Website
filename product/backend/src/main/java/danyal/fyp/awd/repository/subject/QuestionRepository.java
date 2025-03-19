package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.dto.admin.QuestionDataDto;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.model.subject.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> getQuestionByTopic(Topic topic);

    @Query("select new danyal.fyp.awd.dto.admin.QuestionDataDto(" +
            "q.id, q.question, q.answer, q.marks, t.name, s.name) " +
            "from Question q " +
            "left join q.topic t " +
            "left join t.subject s")
    List<QuestionDataDto> getQuestionData();
}
