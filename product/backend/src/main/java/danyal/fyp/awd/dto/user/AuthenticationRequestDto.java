package danyal.fyp.awd.dto.user;

/**
 * A DTO representing an authentication request.
 *
 * @param username the username for authentication.
 * @param password the password for authentication.
 * @author Danyal Shah
 */
public record AuthenticationRequestDto(String username, String password) {
}
