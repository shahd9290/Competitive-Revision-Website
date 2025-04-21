package danyal.fyp.awd.dto.admin.subject;

/**
 * Data transfer object for editing an existing subject.
 *
 * @param id the unique identifier of the subject to be edited
 * @param subject the updated name of the subject
 * @param qualification the updated qualification associated with the subject
 * @author Danyal Shah
 */
public record SubjectEditDto(int id, String subject, String qualification) {
}
