package danyal.fyp.awd.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

/**
 * Service class for creating cookies used in authentication.
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
     *
     * @param token the JWT access token to include in the cookie.
     * @return a {@link ResponseCookie} containing the access token.
     */
    public ResponseCookie createTokenCookie(String token) {

        return ResponseCookie.from("token", token)
                .httpOnly(true)
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();
    }

    /**
     * Creates a secure HTTP-only cookie for the token expiry timestamp.
     *
     * @return a {@link ResponseCookie} containing the expiry time of the token in seconds since epoch.
     */
    public ResponseCookie createTimerCookie() {
        Duration expiryD = ttl.minusMinutes(2);
        Instant expiryI = Instant.now().plus(expiryD);

        return ResponseCookie.from("tokenExpiry", String.valueOf(expiryI.getEpochSecond()))
                .httpOnly(true)
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();
    }
}
