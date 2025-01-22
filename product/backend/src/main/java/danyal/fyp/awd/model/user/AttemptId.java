package danyal.fyp.awd.model.user;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class AttemptId implements Serializable {
    private UUID userId;
    private int topicId;
    private Instant date;
}
