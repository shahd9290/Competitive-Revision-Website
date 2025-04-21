package danyal.fyp.awd.dto.user.auth;

/**
 * A DTO representing an authentication request.
 * Contains the credentials and role provided by the user during login.
 *
 * @param username the username for authentication
 * @param password the password for authentication
 * @param role the role of the user attempting to authenticate
 * @author Danyal Shah
 */
public record AuthenticationRequestDto(String username, String password, String role) {
}
