package danyal.fyp.awd.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

/**
 * Configures Cross-Origin Resource Sharing (CORS) in the application.
 *
 * This configuration was implemented with reference to CORS in Spring Boot Applications, provided by Salman Mohamed via
 * <a href="https://medium.com/@sallu-salman/cross-origin-resource-sharing-cors-in-spring-boot-applications-116163a88adc">medium.com</a>
 *
 * @author Danyal Shah
 */
@Component
public class CorsConfig implements CorsConfigurationSource {
    /**
     * Provides the CORS configuration for the given HTTP request.
     *
     * @param request the {@link HttpServletRequest} for which the CORS configuration is applied.
     * @return a {@link CorsConfiguration} object that specifies the CORS rules.
     */

    @Value("${FRONTEND}")
    private String frontendURI;

    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(frontendURI));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        return config;
    }
}
