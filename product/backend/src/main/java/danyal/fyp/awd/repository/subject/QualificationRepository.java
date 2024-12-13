package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.model.subject.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing {@link Qualification} entities.
 *
 * @author Danyal Shah
 */
@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {

    /**
     * Checks if a qualification exists by its name.
     *
     * @param username the name of the qualification.
     * @return {@code true} if a qualification with the given name exists; {@code false} otherwise.
     */
    boolean existsByName(String username);

    /**
     * Finds a qualification by its name.
     *
     * @param name the name of the qualification.
     * @return an {@link Optional} containing the qualification if found, or empty otherwise.
     */
    Optional<Qualification> findByName(String name); 

}
