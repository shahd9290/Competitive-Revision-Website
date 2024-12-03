package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.dto.subject.SubjectAllResultDto;
import danyal.fyp.awd.dto.subject.SubjectResultDto;
import danyal.fyp.awd.model.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

    @Query("SELECT new danyal.fyp.awd.dto.subject.SubjectResultDto(s.id, s.name) " +
            "FROM Subject s JOIN s.qualifications q WHERE q.id = :qualificationId")
    List<SubjectResultDto> findSubjectsByQualificationId(@Param("qualificationId") Integer qualificationId);

    @Query("SELECT 1 FROM Subject s JOIN s.qualifications q WHERE q.id = :qualificationId AND s.name = :subName")
    Optional<Subject> findByName(@Param("subName") String name, @Param("qualificationId") Integer qualificationId);

}
