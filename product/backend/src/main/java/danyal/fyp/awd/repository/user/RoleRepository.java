package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing {@link Role} entities.
 * Provides methods for finding roles by their name.
 *
 * @author Danyal Shah
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    /**
     * Finds a role by its name.
     *
     * @param name the name of the role
     * @return an {@link Optional} containing the role if found, or empty otherwise
     */
    Optional<Role> findByName(String name);
}
