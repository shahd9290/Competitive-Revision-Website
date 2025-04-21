package danyal.fyp.awd.repository.admin;

import danyal.fyp.awd.model.admin.Log;
import danyal.fyp.awd.model.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for performing CRUD operations on activity logs.
 * Provides methods for deleting logs and retrieving the latest logs.
 *
 * @author Danyal Shah
 */
@Repository
public interface LogRepository extends JpaRepository<Log, Integer> {

    /**
     * Deletes all logs associated with a specific user.
     *
     * @param user the user whose logs are to be deleted
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM Log l WHERE l.user = :user")
    void deleteUserLogs(@Param("user") User user);

    /**
     * Retrieves the latest activity logs, ordered by date in descending order.
     *
     * @return a list of the most recent logs
     */
    @Query("SELECT l FROM Log l ORDER BY l.date DESC")
    List<Log> getLatest();
}
