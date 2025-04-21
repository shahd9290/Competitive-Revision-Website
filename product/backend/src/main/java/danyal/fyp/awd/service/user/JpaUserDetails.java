package danyal.fyp.awd.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Custom implementation of {@link UserDetails} to represent user information
 * for authentication purposes. This class holds the user's username, password,
 * and authorities, and provides methods to check account status for authentication
 * in Spring Security.
 *
 * @author Danyal Shah
 */
@RequiredArgsConstructor
public class JpaUserDetails implements UserDetails {

    private final String username;

    private final String password;

    private final Collection<? extends GrantedAuthority> authorities;

    /**
     * Retrieves the authorities granted to the user.
     *
     * @return a collection of granted authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /**
     * Retrieves the user's password.
     *
     * @return the password of the user.
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Retrieves the username of the user.
     *
     * @return the username of the user.
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Indicates whether the user's account has expired.
     *
     * @return {@code true} if the account is non-expired, {@code false} otherwise.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is locked.
     *
     * @return {@code true} if the account is non-locked, {@code false} otherwise.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) have expired.
     *
     * @return {@code true} if the credentials are non-expired, {@code false} otherwise.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is enabled.
     *
     * @return {@code true} if the account is enabled, {@code false} otherwise.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
