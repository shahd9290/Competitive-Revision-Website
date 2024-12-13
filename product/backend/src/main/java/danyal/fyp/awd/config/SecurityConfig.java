package danyal.fyp.awd.config;

import danyal.fyp.awd.filter.TokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configures the security settings for the application, including HTTP security, CORS,
 * token-based authentication, and password encoding.
 *
 * @author Danyal Shah
 */
@Configuration
public class SecurityConfig {

    @Autowired
    CorsConfig corsConfig;

    /**
     * Configures the {@link SecurityFilterChain} to define security rules and apply filters.
     *
     *
     * @param http the {@link HttpSecurity} object to configure security features.
     * @return the configured {@link SecurityFilterChain}.
     * @throws Exception if an error occurs while configuring security settings.
     */

    @Bean
    public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(new TokenFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**",
                                "/api/qualification/get-all",
                                // For Interim Submission Only
                                "/api/subject/add",
                                "/api/qualification/add",
                                "/api/topic/add"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .cors(c -> c.configurationSource(corsConfig))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(server -> server
                        .jwt(Customizer.withDefaults())
                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                        .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
                )
                .build();
    }

    /**
     * Configures the {@link AuthenticationManager} bean to provide authentication management.
     *
     * @param authenticationConfiguration the {@link AuthenticationConfiguration} used to set up authentication.
     * @return the {@link AuthenticationManager} instance.
     * @throws Exception if an error occurs during configuration.
     */
    @Bean
    public AuthenticationManager authenticationManager(final AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Configures the {@link PasswordEncoder} bean using the {@link BCryptPasswordEncoder}.
     *
     * <p>This encoder is used for hashing passwords securely.</p>
     *
     * @return a {@link PasswordEncoder} instance.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
