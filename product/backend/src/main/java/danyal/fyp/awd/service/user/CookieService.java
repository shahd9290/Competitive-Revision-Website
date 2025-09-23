package danyal.fyp.awd.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

/**
 * Service class for creating cookies used in authentication.
 * This service is responsible for generating HTTP-only cookies for access tokens
 * and the associated expiration times to manage user authentication sessions.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class CookieService {

    @Value("${jwt.ttl}")
    private final Duration ttl;

    /**
     * Creates a secure HTTP-only cookie for the access token.
     * The cookie will have the JWT access token and its lifespan is determined
     * by the configured TTL (Time-to-Live).
     *
     * @param token the JWT access token to include in the cookie.
     * @return a {@link ResponseCookie} containing the access token.
     */
    public ResponseCookie createTokenCookie(String token) {
        return ResponseCookie.from("token", token)
		        .domain(".danyalshah.com")
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();
    }

    /**
     * Creates a secure HTTP-only cookie for the token expiry timestamp.
     * The cookie contains the expiration time of the token, adjusted by subtracting
     * two minutes from the TTL to prevent race conditions during token expiry.
     *
     * @return a {@link ResponseCookie} containing the expiry time of the token
     *         in seconds since the epoch.
     */
    public ResponseCookie createTimerCookie() {
        Duration expiryD = ttl.minusMinutes(2);
        Instant expiryI = Instant.now().plus(expiryD);

        return ResponseCookie.from("tokenExpiry", String.valueOf(expiryI.getEpochSecond()))
                .domain(".danyalshah.com")
		        .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();
    }
}
