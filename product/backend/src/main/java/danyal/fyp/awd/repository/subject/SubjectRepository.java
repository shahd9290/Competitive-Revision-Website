package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.model.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

    @Query("SELECT s FROM Subject s JOIN s.qualifications q WHERE q.id = :qualificationId")
    List<Subject> findSubjectsByQualificationId(@Param("qualificationId") Integer qualificationId);

    Optional<Subject> findByName(String name);

}
