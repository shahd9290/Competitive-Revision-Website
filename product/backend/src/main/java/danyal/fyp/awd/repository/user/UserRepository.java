package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for managing {@link User} entities.
 *
 * @author Danyal Shah
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Finds a user by their username.
     *
     * @param username the username of the user.
     * @return an {@link Optional} containing the user if found, or empty otherwise.
     */
    Optional<User> findByUsername(String username);

    /**
     * Checks if a user exists by their username.
     *
     * @param username the username to check.
     * @return {@code true} if a user with the given username exists; {@code false} otherwise.
     */
    boolean existsByUsername(String username);

    /**
     * Checks if a user exists by their email address.
     *
     * @param email the email to check.
     * @return {@code true} if a user with the given email exists; {@code false} otherwise.
     */
    boolean existsByEmail(String email);

    /**
     * Retrieves the qualification ID associated with a specific username.
     *
     * @param username the username of the user.
     * @return the qualification ID of the user.
     */
    @Query("SELECT u.qualificationId FROM User u WHERE u.username = :username")
    int findQualificationIdByUsername(@Param("username") String username);
}
