package danyal.fyp.awd.repository.user;

import danyal.fyp.awd.model.user.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByIdAndExpiresAtAfter(UUID id, Instant date);

    Optional<RefreshToken> findByUserIdAndExpiresAtAfter(UUID userId, Instant date);

    Optional<RefreshToken> findByUserId(UUID userId);

}
