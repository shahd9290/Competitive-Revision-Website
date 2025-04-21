package danyal.fyp.awd.dto.admin.question;

/**
 * A DTO for editing an existing question.
 * Allows partial or full updates to the question's content and metadata.
 *
 * @param id the unique identifier of the question to be edited
 * @param question the updated question text
 * @param answer the updated answer to the question
 * @param marks the updated mark value (can be null if unchanged)
 * @author Danyal Shah
 */
public record QuestionEditDto(int id, String question, String answer, Integer marks) {
}
