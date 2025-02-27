package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.dto.admin.QuestionDataDto;
import danyal.fyp.awd.dto.admin.SubjectDataDto;
import danyal.fyp.awd.model.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing {@link Subject} entities.
 *
 * @author Danyal Shah
 */
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

    /**
     * Retrieves a list of subjects associated with a specific qualification ID.
     *
     * @param qualificationId the ID of the qualification.
     * @return a list of {@link Subject} entities associated with the given qualification ID.
     */
    @Query("SELECT s FROM Subject s JOIN s.qualifications q WHERE q.id = :qualificationId")
    List<Subject> findSubjectsByQualificationId(@Param("qualificationId") Integer qualificationId);

    /**
     * Finds a subject by its name.
     *
     * @param name the name of the subject.
     * @return an {@link Optional} containing the subject if found, or empty otherwise.
     */
    @Query("SELECT s FROM Subject s WHERE s.name = :name")
    Optional<Subject> findByName(String name);

    @Query("SELECT new danyal.fyp.awd.dto.admin.SubjectDataDto(s.name, cast(count(t.name) as int), q.name) from Subject s join s.topics t join t.qualification q group by s.name, q.name")
    List<SubjectDataDto> findAllDetails();
}
