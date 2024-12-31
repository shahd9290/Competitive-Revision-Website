package danyal.fyp.awd.dto.user;

/**
 * A DTO representing a user's profile information.
 *
 * @param email    the email address of the user.
 * @param username the username of the user.
 * @param marks the marks that the user has.
 * @author Danyal Shah
 */
public record UserProfileDto(String email, String username, int marks) {
}
