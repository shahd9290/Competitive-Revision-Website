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
       RefreshToken refreshToken = getRefreshToken(accessToken);
       User user = refreshToken.getUser();
        // Checks expiry data is valid.
        if (hasInvalidRefreshToken(user))
            // No token found? Somehow? Brand new one then
                refreshToken = createToken(user);

        final var newAccessToken = jwtService.generateToken(user.getUsername());
        return new AuthenticationResponseDto(newAccessToken);
    }

    public void revokeRefreshToken(UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    public RefreshToken getRefreshToken(String accessToken) {
        // Need to get RefreshToken from database, via User ID.
        // Decode access token to get username -> get id -> use to get refresh token + validate
        String username = jwtService.extractUsernameFromToken(accessToken);
        User user = userService.getUserByUsername(username);

        // Refresh Token should exist because the user would've been required to log into the system - which generates one and saves it anyways.
        // It should not be possible for the user to be authenticated without a refresh token in the database.
        return refreshTokenRepository.findByUserId(user.getId()).orElse(null);
    }

    public boolean hasInvalidRefreshToken(User user) {
        RefreshToken token = refreshTokenRepository.findByIdAndExpiresAtAfter(user.getId(), Instant.now()).orElse(null);

        return token == null;
    }

}
