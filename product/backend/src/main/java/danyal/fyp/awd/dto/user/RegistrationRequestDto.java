package danyal.fyp.awd.dto.user;

/**
 * A DTO representing a user registration request.
 *
 * @param username      the username for the new user.
 * @param email         the email address for the new user.
 * @param password      the password for the new user.
 * @param qualification the qualification associated with the new user.
 * @author Danyal Shah
 */
public record RegistrationRequestDto(String username, String email, String password, String qualification) {
}
