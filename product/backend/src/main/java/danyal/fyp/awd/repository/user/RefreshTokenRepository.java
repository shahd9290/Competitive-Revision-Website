package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.user.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for managing {@link RefreshToken} entities.
 * Provides methods for finding refresh tokens by user ID and checking expiration.
 *
 * @author Danyal Shah
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    /**
     * Finds a refresh token for a user that has not yet expired.
     *
     * @param userId the ID of the user
     * @param date the current date and time to check expiration
     * @return an {@link Optional} containing the refresh token if found, or empty otherwise
     */
    Optional<RefreshToken> findByUserIdAndExpiresAtAfter(UUID userId, Instant date);

    /**
     * Finds the most recent refresh token for a user by their ID.
     *
     * @param userId the ID of the user
     * @return an {@link Optional} containing the refresh token if found, or empty otherwise
     */
    Optional<RefreshToken> findByUserId(UUID userId);
}
