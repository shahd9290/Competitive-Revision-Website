package danyal.fyp.awd.dto.admin.question;

/**
 * A DTO representing detailed information about a question.
 * Includes question content, associated subject and topic, and metadata.
 *
 * @param id the unique identifier of the question
 * @param question the question text
 * @param answer the correct answer to the question
 * @param marks the number of marks assigned to the question
 * @param subject the subject associated with the question
 * @param topic the topic under which the question falls
 * @author Danyal Shah
 */
public record QuestionDataDto(int id, String question, String answer, int marks, String subject, String topic) {
}
