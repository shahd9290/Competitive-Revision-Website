package danyal.fyp.awd.dto.admin.subject;

/**
 * A DTO representing subject details for admin view.
 * Includes subject name, associated qualification, and topic count.
 *
 * @param id the unique identifier of the subject
 * @param name the name of the subject
 * @param topicNum the number of topics under this subject
 * @param qualification the qualification associated with the subject
 * @author Danyal Shah
 */
public record SubjectDataDto (int id, String name, int topicNum, String qualification) {
}
