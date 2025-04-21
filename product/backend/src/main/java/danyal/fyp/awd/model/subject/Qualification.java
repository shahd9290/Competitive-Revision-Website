package danyal.fyp.awd.model.subject;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * Represents a qualification entity in the system.
 * A qualification can be linked to multiple subjects and users.
 *
 * @author Danyal Shah
 */
@Entity
@Table(name = "qualifications")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Qualification {

    /**
     * The unique identifier for the qualification.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * The name of the qualification.
     */
    @Column(nullable = false)
    private String name;
}
