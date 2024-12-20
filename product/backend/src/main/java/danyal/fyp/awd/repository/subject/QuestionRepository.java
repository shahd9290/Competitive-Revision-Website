package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.model.subject.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
