package danyal.fyp.awd.model.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import danyal.fyp.awd.model.subject.Topic;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Auditable;

import java.time.Instant;

/**
 * Entity representing a user's attempt on a specific topic.
 * Stores a composite key made of user ID, topic ID, and timestamp.
 *
 * @author Danyal Shah
 */
@Entity
@Table(name = "recent_attempts")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(Auditable.class)
public class UserAttempts {

    /**
     * Composite primary key containing user ID, topic ID, and attempt timestamp.
     */
    @EmbeddedId
    private AttemptId id;

    /**
     * The user who made the attempt.
     */
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    /**
     * The topic on which the attempt was made.
     */
    @ManyToOne
    @MapsId("topicId")
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonBackReference
    private Topic topic;

    /**
     * The proportion score achieved in the attempt (e.g., 0.75 for 75%).
     */
    @Column(nullable = false)
    private double proportion;
}
