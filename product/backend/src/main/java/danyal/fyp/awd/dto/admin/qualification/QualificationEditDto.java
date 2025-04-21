package danyal.fyp.awd.dto.admin.qualification;

/**
 * A DTO for editing an existing qualification.
 * Contains the ID and updated qualification name.
 *
 * @param id the unique identifier of the qualification to be edited
 * @param qualification the new name or title for the qualification
 * @author Danyal Shah
 */
public record QualificationEditDto(int id, String qualification) {
}
