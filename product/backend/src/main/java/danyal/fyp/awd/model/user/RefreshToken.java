package danyal.fyp.awd.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

/**
 * Represents a refresh token entity in the system.
 * Used for handling token-based authentication and session renewal.
 *
 * @author Danyal Shah
 */
@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class RefreshToken {

    /**
     * The unique identifier for the refresh token.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    /**
     * The user associated with the refresh token.
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * The creation timestamp of the refresh token.
     */
    @Column(nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    /**
     * The expiration timestamp of the refresh token.
     */
    @Column(nullable = false)
    private Instant expiresAt;
}
