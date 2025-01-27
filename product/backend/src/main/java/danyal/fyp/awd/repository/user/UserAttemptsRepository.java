package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.user.AttemptId;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.model.user.UserAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAttemptsRepository extends JpaRepository<UserAttempts, AttemptId> {

    @Query("SELECT ua FROM UserAttempts ua WHERE ua.user = :user ORDER BY ua.id.date DESC LIMIT 3")
    List<UserAttempts> findRecentAttempts(@Param("user") User user);

}
