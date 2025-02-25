package danyal.fyp.awd.service.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import danyal.fyp.awd.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


/**
 * Service class for managing JWT generation and validation.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class JwtService {

    private final String issuer;

    private final Duration ttl;

    private final JwtEncoder jwtEncoder;

    /**
     * Generates a JWT token for the specified username.
     *
     * @param username the username for which the token is generated.
     * @return the generated JWT token as a string.
     */
    public String generateToken(final String username) {
        final var claimsSet = JwtClaimsSet.builder()
                .subject(username)
                .issuer(issuer)
                .expiresAt(Instant.now().plus(ttl))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet))
                .getTokenValue();
    }

    public String generateToken(final JpaUserDetails userDetails) {
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        final var claimsSet = JwtClaimsSet.builder()
                .subject(userDetails.getUsername())
                .issuer(issuer)
                .expiresAt(Instant.now().plus(ttl))
                .claim("role", roles.get(0))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet))
                .getTokenValue();
    }

    /**
     * Extracts the username from a given JWT token.
     *
     * @param token the JWT token to decode.
     * @return the username (subject) contained in the token.
     */
    public String getUserNameFromJwtToken(String token) {
        // If we get to this function - the token should already be authenticated as it's called via the /api/refresh/ path - which requires authentication.
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getSubject();
    }

    /**
     * Checks whether a given JWT token has expired.
     *
     * @param token the JWT token to validate.
     * @return {@code true} if the token has expired; {@code false} otherwise.
     */
    public boolean validateJwtToken(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getExpiresAt().after(new Date());
    }

}
