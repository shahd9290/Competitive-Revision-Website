package danyal.fyp.awd.dto.admin.subject;

/**
 * A DTO representing a subject and its associated qualification.
 * Used for creating or referencing a subject in admin operations.
 *
 * @param name the name of the subject
 * @param qualification the name of the associated qualification
 * @author Danyal Shah
 */
public record SubjectDto(String name, String qualification) {
}
