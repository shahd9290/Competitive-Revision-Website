package danyal.fyp.awd.model.subject;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * Entity representing a question associated with a specific topic.
 * Each question has a text, a mark value, an answer, and is linked to a topic.
 *
 * @author Danyal Shah
 */
@Entity
@Table(name = "questions")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Question {

    /**
     * The unique identifier for the question.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * The text content of the question.
     */
    @Column(nullable = false)
    private String question;

    /**
     * The number of marks assigned to the question.
     */
    @Column(nullable = false)
    private int marks;

    /**
     * The topic to which this question belongs.
     */
    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonBackReference
    private Topic topic;

    /**
     * The correct answer to the question.
     */
    @Column(nullable = false)
    private String answer;
}
