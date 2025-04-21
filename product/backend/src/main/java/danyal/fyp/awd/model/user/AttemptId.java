package danyal.fyp.awd.model.user;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

/**
 * Composite key for identifying a user's attempt on a topic at a specific time.
 * This is used as the primary key for entities that track user attempts.
 *
 * Consists of user ID, topic ID, and the timestamp of the attempt.
 *
 * @author Danyal Shah
 */
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class AttemptId implements Serializable {

    /**
     * The UUID of the user who made the attempt.
     */
    private UUID userId;

    /**
     * The ID of the topic the attempt is associated with.
     */
    private int topicId;

    /**
     * The timestamp when the attempt was made.
     */
    private Instant date;
}
