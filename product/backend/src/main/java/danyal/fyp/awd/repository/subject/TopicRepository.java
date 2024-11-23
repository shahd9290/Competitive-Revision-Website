package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.model.subject.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {
    Optional<Topic> findByNameAndQualificationId(String name, Integer qualificationId);

    Optional<Topic> findByName(String name);
}
