package danyal.fyp.awd.dto.admin.user;

import java.util.UUID;

/**
 * A DTO for editing an existing user's information.
 * Allows updating of user details such as username, email, password, role, and qualification.
 *
 * @param id the unique identifier (UUID) of the user
 * @param username the updated username
 * @param email the updated email address
 * @param password the updated password
 * @param role the updated role (e.g., "Admin", "User", or preformatted like "ROLE_ADMIN")
 * @param qualification the updated qualification associated with the user
 * @author Danyal Shah
 */
public record UserEditDto(UUID id, String username, String email, String password, String role, String qualification) {

    /**
     * Compact constructor to normalize role values.
     * Converts "Admin" to "ROLE_ADMIN" and "User" to "ROLE_USER".
     * Leaves any other role string unchanged.
     */
    public UserEditDto {
        role = switch (role) {
            case "Admin" -> "ROLE_ADMIN";
            case "User" -> "ROLE_USER";
            default -> role;
        };
    }
}
