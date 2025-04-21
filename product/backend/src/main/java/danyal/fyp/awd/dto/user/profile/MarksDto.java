package danyal.fyp.awd.dto.user.profile;

/**
 * A DTO for submitting user marks and related data.
 * Includes the score, associated topic, and performance proportion.
 *
 * @param marks the score obtained by the user
 * @param topicId the ID of the topic the marks are associated with
 * @param proportion the proportion of correct answers or performance (e.g., 0.85 for 85%)
 * @author Danyal Shah
 */
public record MarksDto(int marks, int topicId, double proportion) {
}
