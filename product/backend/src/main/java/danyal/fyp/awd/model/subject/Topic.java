package danyal.fyp.awd.model.subject;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * Represents a topic entity in the system.
 *
 * @author Danyal Shah
 */
@Entity
@Table(name="topics")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Topic {

    /**
     * The unique identifier for the topic.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * The name of the topic.
     */
    @Column(nullable = false)
    private String name;

    /**
     * The qualification associated with the topic.
     */
    @ManyToOne
    @JoinColumn(name="qualification_id", nullable = false)
    @JsonBackReference
    private Qualification qualification;

    /**
     * The subject associated with the topic.
     */
    @ManyToOne
    @JoinColumn(name="subject_id", nullable = false)
    @JsonBackReference
    private Subject subject;


}
