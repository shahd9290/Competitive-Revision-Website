package danyal.fyp.awd.service.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@RequiredArgsConstructor
public class JwtService {

    private final String issuer;

    private final Duration ttl;

    private final JwtEncoder jwtEncoder;

    public String generateToken(final String username) {
        final var claimsSet = JwtClaimsSet.builder()
                .subject(username)
                .issuer(issuer)
                .expiresAt(Instant.now().plus(ttl))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet))
                .getTokenValue();
    }

    public String extractUsernameFromToken(String token) {
        // If we get to this function - the token should already be authenticated as it's called via the /api/refresh/ path - which requires authentication.
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getSubject();
    }

    public boolean isExpired(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getExpiresAt().before(new Date());
    }
}
