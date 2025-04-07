package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.auth.AuthenticationResponseDto;
import danyal.fyp.awd.model.user.RefreshToken;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

/**
 * Service class for managing refresh tokens.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${jwt.refresh-token-ttl}")
    private final Duration refreshTokenTtl;

    private final RefreshTokenRepository refreshTokenRepository;

    private final JwtService jwtService;

    private final UserService userService;

    /**
     * Creates a new refresh token for the specified user.
     *
     * @param user the user for whom the refresh token is created.
     * @return the created {@link RefreshToken}.
     */
    public RefreshToken createToken(User user) {
        var refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiresAt(Instant.now().plus(refreshTokenTtl));
        return refreshTokenRepository.save(refreshToken);
    }

    /**
     * Refreshes the access token using the user's current refresh token.
     *
     * @param accessToken the current access token.
     * @return an {@link AuthenticationResponseDto} containing the new access token.
     */
    public AuthenticationResponseDto refreshToken(String accessToken) {
        User user = userService.getUserByUsername(jwtService.getUserNameFromJwtToken(accessToken));
        // Checks expiry data is valid.
        if (hasInvalidRefreshToken(user))
            // No token found? Somehow? Brand new one then
            createToken(user);

        final var newAccessToken = jwtService.generateToken(user.toJpaUserDetails());

        return new AuthenticationResponseDto(newAccessToken);
    }

    /**
     * Revokes a refresh token by its UUID.
     *
     * @param refreshToken the UUID of the refresh token to revoke.
     */
    public void revokeRefreshToken(UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    /**
     * Retrieves the refresh token associated with a user.
     *
     * @param user the user whose refresh token is to be retrieved.
     * @return the {@link RefreshToken} if found, or {@code null} otherwise.
     */
    public RefreshToken getRefreshToken(User user) {
        // Refresh Token should exist because the user would've been required to log into the system - which generates one and saves it anyways.
        // It should not be possible for the user to be authenticated without a refresh token in the database.
        return refreshTokenRepository.findByUserId(user.getId()).orElse(null);
    }

    /**
     * Checks if a user has an invalid or expired refresh token.
     *
     * @param user the user whose refresh token is to be validated.
     * @return {@code true} if the refresh token is invalid or expired; {@code false} otherwise.
     */
    public boolean hasInvalidRefreshToken(User user) {
        RefreshToken token = refreshTokenRepository.findByUserIdAndExpiresAtAfter(user.getId(), Instant.now()).orElse(null);

        return token == null;
    }

}
