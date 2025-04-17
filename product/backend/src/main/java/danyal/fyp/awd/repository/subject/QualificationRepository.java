package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.dto.admin.qualification.QualificationDataDto;
import danyal.fyp.awd.model.subject.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing {@link Qualification} entities.
 *
 * @author Danyal Shah
 */
@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {

    /**
     * Finds a qualification by its name.
     *
     * @param name the name of the qualification.
     * @return an {@link Optional} containing the qualification if found, or empty otherwise.
     */
    Optional<Qualification> findByName(String name);

    @Query("SELECT new danyal.fyp.awd.dto.admin.qualification.QualificationDataDto(" +
            "q.id, q.name, CAST(COUNT(DISTINCT s) AS int), CAST(COUNT(DISTINCT u) AS int))" +
            "FROM Qualification q " +
            "LEFT JOIN Subject s ON q MEMBER OF s.qualifications " +
            "LEFT JOIN User u ON u.qualificationId = q.id " +
            "GROUP BY q.id, q.name " +
            "ORDER BY q.name ASC")
    List<QualificationDataDto> getAllData();
}
