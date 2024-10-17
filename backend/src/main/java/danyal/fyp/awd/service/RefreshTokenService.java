package danyal.fyp.awd.service;

import danyal.fyp.awd.dto.AuthenticationResponseDto;
import danyal.fyp.awd.model.RefreshToken;
import danyal.fyp.awd.model.User;
import danyal.fyp.awd.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
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
        // Need to get RefreshToken from database, via User ID.
        // Decode access token to get username -> get id -> use to get refresh token + validate
        String username = jwtService.extractUsernameFromToken(accessToken);
        User user = userService.getUserByUsername(username);
        // Refresh Token should exist because the user would've been required to log into the system - which generates one and saves it anyways.
        // It should not be possible for the user to be authenticated without a refresh token in the database.
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(user.getId()).orElse(null);
        assert refreshToken != null;

        // Checks expiry data is valid.
        final var refreshTokenEntity = refreshTokenRepository.findByIdAndExpiresAtAfter(refreshToken.getId(), Instant.now())
                .orElseThrow(() -> new BadCredentialsException("Invalid or expired refresh token"));

        final var newAccessToken = jwtService.generateToken(refreshTokenEntity.getUser().getUsername());
        return new AuthenticationResponseDto(newAccessToken, refreshToken.getId());
    }

    public void revokeRefreshToken(UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }
}
