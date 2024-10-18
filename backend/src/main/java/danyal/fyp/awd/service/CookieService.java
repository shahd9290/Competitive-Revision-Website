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

    public String createTokenCookie(String token) {
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();

        return cookie.toString();
    }

    public String createTimerCookie() {
        Duration expiryD = ttl.minusMinutes(2);
        Instant expiryI = Instant.now().plus(expiryD);
        ResponseCookie cookie = ResponseCookie.from("tokenExpiry", String.valueOf(expiryI.getEpochSecond()))
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(ttl.getSeconds())
                .build();

        return cookie.toString();
    }
}
