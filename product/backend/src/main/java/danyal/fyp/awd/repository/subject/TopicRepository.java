package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.dto.admin.topic.TopicDataDto;
import danyal.fyp.awd.dto.subject.TopicCountDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.model.subject.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing {@link Topic} entities.
 *
 * @author Danyal Shah
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {

    /**
     * Retrieves all topics associated with a specific subject and qualification.
     *
     * @param subject       the subject.
     * @param qualification the qualification.
     * @return a list of {@link Topic} entities matching the criteria.
     */
    @Query("SELECT new danyal.fyp.awd.dto.subject.TopicCountDto(" +
            "t.id, t.name, cast(count(qu.id) as int)) " +
            "from Topic t " +
            "left join Question qu on qu.topic = t " +
            "where t.subject = :sub and t.qualification = :qual " +
            "group by t.id, t.name ")
    List<TopicCountDto> findAllBySubjectIdAndQualificationId(@Param("sub") Subject subject, @Param("qual") Qualification qualification);

    /**
     * Finds a topic by its name and associated qualification ID.
     *
     * @param name            the name of the topic.
     * @param qualificationId the ID of the qualification.
     * @return an {@link Optional} containing the topic if found, or empty otherwise.
     */
    Optional<Topic> findByNameAndQualificationId(String name, Integer qualificationId);

    @Query("select new danyal.fyp.awd.dto.admin.topic.TopicDataDto(" +
            "t.id, t.name, s.name, q.name, cast(count(qu.id) as int)) " +
            "from Topic t " +
            "left join t.subject s " +
            "left join t.qualification q " +
            "left join Question qu on qu.topic = t " +
            "group by t.id, t.name, s.name, q.name ")
    List<TopicDataDto> findTopicDetails();

    @Query("select cast(count(qu.id) as int)" +
            "from Topic t " +
            "left join Question qu on qu.topic = t " +
            "where t.subject = :sub and t.qualification = :qual ")
    int countQuestions(@Param("sub") Subject subject, @Param("qual") Qualification qualification);
}
