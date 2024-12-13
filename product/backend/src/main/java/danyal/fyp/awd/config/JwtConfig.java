package danyal.fyp.awd.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import danyal.fyp.awd.service.user.JwtService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;

/**
 * Configures JWT encoding and decoding using RSA keys and defines beans for {@link JwtEncoder},
 * {@link JwtDecoder}, and a custom {@link JwtService}.
 *
 * @author Danyal Shah
 */
@Configuration
@Setter
@Getter
@ConfigurationProperties(prefix = "jwt")
public class JwtConfig {

    private RSAPrivateKey privateKey;

    private RSAPublicKey publicKey;

    private Duration ttl;

    /**
     * Creates a {@link JwtEncoder} bean for encoding JWTs using RSA keys.
     *
     * @return a configured {@link JwtEncoder} instance.
     */
    @Bean
    public JwtEncoder jwtEncoder() {
        final var jwk = new RSAKey.Builder(publicKey)
                .privateKey(privateKey).build();

        return new NimbusJwtEncoder(
                new ImmutableJWKSet<>(new JWKSet(jwk)));
    }

    /**
     * Creates a {@link JwtDecoder} bean for decoding JWTs using the RSA public key.
     *
     * @return a configured {@link JwtDecoder} instance.
     */
    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(publicKey).build();
    }

    /**
     * Creates a {@link JwtService} bean for managing JWT operations,
     *
     * @param appName    the name of the Spring application, injected from configuration.
     * @param jwtEncoder the {@link JwtEncoder} used for encoding JWTs.
     * @return a configured {@link JwtService} instance.
     */
    @Bean
    public JwtService jwtService(
            @Value("${spring.application.name}") final String appName,
            final JwtEncoder jwtEncoder) {

        return new JwtService(appName, ttl, jwtEncoder);
    }

}
