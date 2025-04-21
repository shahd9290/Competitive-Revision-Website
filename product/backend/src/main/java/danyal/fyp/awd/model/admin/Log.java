package danyal.fyp.awd.model.admin;

import danyal.fyp.awd.model.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

/**
 * Entity representing an activity log entry in the system.
 * Used for tracking user actions performed in the admin interface.
 *
 * @author Danyal Shah
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="activity_logs")
@EntityListeners(AuditingEntityListener.class)
public class Log {

    /**
     * The unique identifier for the log entry.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * The user who performed the activity.
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * The description of the activity performed.
     */
    @Column(nullable = false)
    private String activity;

    /**
     * The timestamp when the activity occurred.
     */
    @Column(nullable = false)
    private Instant date;
}
