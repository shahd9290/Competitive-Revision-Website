package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.AuthenticationResponseDto;
import danyal.fyp.awd.model.user.RefreshToken;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${jwt.refresh-token-ttl}")
    private final Duration refreshTokenTtl;

    private final RefreshTokenRepository refreshTokenRepository;

    private final JwtService jwtService;

    private final UserService userService;

    public RefreshToken createToken(User user) {
        var refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiresAt(Instant.now().plus(refreshTokenTtl));
        return refreshTokenRepository.save(refreshToken);
    }

    public AuthenticationResponseDto refreshToken(String accessToken) {
        User user = userService.getUserByUsername(jwtService.extractUsernameFromToken(accessToken));
        // Checks expiry data is valid.
        if (hasInvalidRefreshToken(user))
            // No token found? Somehow? Brand new one then
            createToken(user);

        final var newAccessToken = jwtService.generateToken(user.getUsername());
        return new AuthenticationResponseDto(newAccessToken);
    }

    public void revokeRefreshToken(UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    public RefreshToken getRefreshToken(User user) {
        // Refresh Token should exist because the user would've been required to log into the system - which generates one and saves it anyways.
        // It should not be possible for the user to be authenticated without a refresh token in the database.
        return refreshTokenRepository.findByUserId(user.getId()).orElse(null);
    }

    public boolean hasInvalidRefreshToken(User user) {
        RefreshToken token = refreshTokenRepository.findByUserIdAndExpiresAtAfter(user.getId(), Instant.now()).orElse(null);

        return token == null;
    }

}
