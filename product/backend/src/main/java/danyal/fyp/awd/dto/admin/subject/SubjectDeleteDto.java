package danyal.fyp.awd.dto.admin.subject;

/**
 * A DTO for deleting a subject.
 * Identifies the subject and its associated qualification.
 *
 * @param id the unique identifier of the subject to be deleted
 * @param qualification the qualification associated with the subject
 * @author Danyal Shah
 */
public record SubjectDeleteDto(int id, String qualification) {
}
