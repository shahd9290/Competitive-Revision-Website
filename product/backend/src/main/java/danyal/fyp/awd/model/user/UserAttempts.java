package danyal.fyp.awd.model.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import danyal.fyp.awd.model.subject.Topic;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Auditable;

import java.time.Instant;

@Entity
@Table(name = "recent_attempts")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(Auditable.class)
public class UserAttempts {

    @EmbeddedId
    private AttemptId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @MapsId("topicId")
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonBackReference
    private Topic topic;

    @Column(nullable = false)
    private double proportion;


}
