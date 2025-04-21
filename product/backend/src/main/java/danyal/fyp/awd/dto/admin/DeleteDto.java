package danyal.fyp.awd.dto.admin;

/**
 * A generic DTO for delete operations.
 * Used for identifying the entity to be deleted by its unique ID.
 *
 * @param id the unique identifier of the entity to be deleted
 * @author Danyal Shah
 */
public record DeleteDto(int id) {
}
