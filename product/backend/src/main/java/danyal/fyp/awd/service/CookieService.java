package danyal.fyp.awd.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class CookieService {

    @Value("${jwt.ttl}")
    private final Duration ttl;

    public ResponseCookie createTokenCookie(String token) {

        return ResponseCookie.from("token", token)
                .httpOnly(true)
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();
    }

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
