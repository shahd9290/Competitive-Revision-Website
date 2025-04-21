package danyal.fyp.awd.dto.user.profile;

/**
 * A DTO representing a user's attempt on a topic.
 * Includes the topic name, proportion score, and the attempt date.
 *
 * @param topicName the name of the topic attempted
 * @param proportion the proportion score as a string (e.g., "85%")
 * @param date the date when the attempt was made
 * @author Danyal Shah
 */
public record UserAttemptDto(String topicName, String proportion, String date) {
}
