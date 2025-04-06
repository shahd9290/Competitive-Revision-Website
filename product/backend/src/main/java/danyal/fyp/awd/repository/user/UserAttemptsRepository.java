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

@Repository
public interface UserAttemptsRepository extends JpaRepository<UserAttempts, AttemptId> {

    @Query("SELECT ua FROM UserAttempts ua WHERE ua.user = :user ORDER BY ua.id.date DESC")
    List<UserAttempts> findRecentAttempts(@Param("user") User user);

    @Query("SELECT ua FROM UserAttempts ua ORDER BY ua.id.date DESC")
    List<UserAttempts> findRecentAttempts();

    @Modifying
    @Transactional
    @Query("DELETE FROM UserAttempts ua WHERE ua.user = :user ")
    void deleteByIdUserId(@Param("user") User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserAttempts ua WHERE ua.topic = :topic ")
    void deleteByIdTopicId(Topic topic);
}
