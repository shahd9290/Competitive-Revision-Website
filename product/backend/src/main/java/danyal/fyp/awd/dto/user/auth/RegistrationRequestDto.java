package danyal.fyp.awd.dto.user.auth;

/**
 * A DTO representing a user registration request.
 * Contains the credentials and user details required to register a new account.
 *
 * @param username the username for the new user
 * @param email the email address for the new user
 * @param role the role of the new user
 * @param password the password for the new user
 * @param qualification the qualification associated with the new user
 * @author Danyal Shah
 */
public record RegistrationRequestDto(String username, String email, String role, String password, String qualification) {
}
