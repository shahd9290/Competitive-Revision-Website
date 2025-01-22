package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.user.AttemptId;
import danyal.fyp.awd.model.user.UserAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAttemptsRepository extends JpaRepository<UserAttempts, AttemptId> {
}
