package danyal.fyp.awd.dto.user.profile;

import java.util.List;

/**
 * A DTO representing a user's profile information.
 * Includes basic account info along with recent quiz attempts.
 *
 * @param username the username of the user
 * @param marks the marks that the user has
 * @param attempts the user's recent quiz attempts
 * @author Danyal Shah
 */
public record UserProfileDto(String username, int marks, List<UserAttemptDto> attempts) {
}
