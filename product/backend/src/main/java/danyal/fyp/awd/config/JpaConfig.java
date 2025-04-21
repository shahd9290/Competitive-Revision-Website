package danyal.fyp.awd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Configures JPA auditing by enabling support for auditing annotations.
 * This configuration class enables JPA auditing for entities in the application.
 * @author Danyal Shah
 */
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
