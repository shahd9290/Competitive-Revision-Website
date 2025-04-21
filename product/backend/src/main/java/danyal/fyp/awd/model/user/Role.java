package danyal.fyp.awd.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a user role in the system (e.g., Admin, User).
 * Used for defining authorities and access levels within the application.
 *
 * @author Danyal Shah
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "roles")
public class Role {

    /**
     * The unique identifier for the role.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    /**
     * The name of the role (e.g., "ROLE_ADMIN", "ROLE_USER").
     */
    @Column(nullable = false)
    private String name;
}
