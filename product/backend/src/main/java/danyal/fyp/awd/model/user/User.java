package danyal.fyp.awd.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a user entity in the system.
 *
 * <p>This entity is mapped to the {@code users} table and includes user details,
 * qualification ID, and associated refresh tokens.</p>
 *
 * @author Danyal Shah
 */
@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class User {

    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * The unique username of the user.
     */
    @Column(nullable = false, unique = true)
    private String username;

    /**
     * The unique email address of the user.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * The encrypted password of the user.
     */
    @Column(nullable = false)
    private String password;

    /**
     * The timestamp of when the user was created.
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    /**
     * The timestamp of the last update to the user's information.
     */
    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;

    /**
     * The ID of the qualification associated with the user.
     */
    @JoinColumn(name = "qualification_id", table = "qualifications", nullable = false)
    private int qualificationId;

    /**
     * The list of refresh tokens associated with the user.
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens = new ArrayList<>();
}

