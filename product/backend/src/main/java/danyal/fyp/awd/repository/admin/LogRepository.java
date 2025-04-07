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

@Repository
public interface LogRepository extends JpaRepository<Log, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Log l WHERE l.user = :user")
    void deleteUserLogs(@Param("user") User user);

    @Query("SELECT l FROM Log l ORDER BY l.date DESC")
    List<Log> getLatest();
}
