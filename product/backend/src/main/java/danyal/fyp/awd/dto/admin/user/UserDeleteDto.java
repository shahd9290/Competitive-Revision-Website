package danyal.fyp.awd.dto.admin.user;

import java.util.UUID;

/**
 * A DTO for deleting a user.
 * Contains the unique identifier (UUID) for the user to be deleted.
 *
 * @param id the unique identifier (UUID) of the user to be deleted
 * @author Danyal Shah
 */
public record UserDeleteDto(UUID id) {
}
