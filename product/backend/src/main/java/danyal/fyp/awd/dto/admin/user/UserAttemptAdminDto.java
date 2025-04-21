package danyal.fyp.awd.dto.admin.user;

/**
 * A DTO representing a user's attempt information for admin view.
 * Includes metadata such as score, topic, and date of the attempt.
 *
 * @param id the unique identifier of the attempt
 * @param user the username of the user who made the attempt
 * @param topic the topic associated with the attempt
 * @param score the score achieved in the attempt
 * @param date the date when the attempt was made
 * @author Danyal Shah
 */
public record UserAttemptAdminDto(int id, String user, String topic, String score, String date) {
}
