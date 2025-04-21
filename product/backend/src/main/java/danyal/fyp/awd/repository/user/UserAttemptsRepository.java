package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.model.user.AttemptId;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.model.user.UserAttempts;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository interface for managing {@link UserAttempts} entities.
 * Provides methods for querying recent user attempts and deleting attempts by user or topic.
 *
 * @author Danyal Shah
 */
@Repository
public interface UserAttemptsRepository extends JpaRepository<UserAttempts, AttemptId> {

    /**
     * Retrieves the most recent attempts made by a specific user.
     *
     * @param user the user whose recent attempts are to be retrieved
     * @return a list of {@link UserAttempts} for the specified user, ordered by date
     */
    @Query("SELECT ua FROM UserAttempts ua WHERE ua.user = :user ORDER BY ua.id.date DESC")
    List<UserAttempts> findRecentAttempts(@Param("user") User user);

    /**
     * Retrieves the most recent user attempts across all users.
     *
     * @return a list of all {@link UserAttempts} ordered by date
     */
    @Query("SELECT ua FROM UserAttempts ua ORDER BY ua.id.date DESC")
    List<UserAttempts> findRecentAttempts();

    /**
     * Deletes all attempts made by a specific user.
     *
     * @param user the user whose attempts are to be deleted
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM UserAttempts ua WHERE ua.user = :user ")
    void deleteByIdUserId(@Param("user") User user);

    /**
     * Deletes all attempts related to a specific topic.
     *
     * @param topic the topic whose related attempts are to be deleted
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM UserAttempts ua WHERE ua.topic = :topic ")
    void deleteByIdTopicId(Topic topic);
}
