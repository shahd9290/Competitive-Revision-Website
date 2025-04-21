package danyal.fyp.awd.dto.admin.question;

/**
 * A DTO for adding a new question.
 * Contains the question content, answer, marks, and associated topic and qualification.
 *
 * @param question the question text
 * @param answer the correct answer to the question
 * @param marks the number of marks assigned to the question
 * @param topic the topic to which the question belongs
 * @param qualification the qualification level associated with the question
 * @author Danyal Shah
 */
public record QuestionAddDto(String question, String answer, int marks, String topic, String qualification) {
}
