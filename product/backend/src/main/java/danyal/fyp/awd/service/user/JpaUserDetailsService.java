package danyal.fyp.awd.service.user;

import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service class for loading user details from the database using JPA.
 * This class implements the {@link UserDetailsService} interface to provide user details
 * for authentication in Spring Security.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Loads user details by username for authentication.
     *
     * @param username the username of the user to load.
     * @return the {@link UserDetails} for the specified username.
     * @throws UsernameNotFoundException if the user is not found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with username[%s] not found".formatted(username)));
        return user.toJpaUserDetails();
    }

}
