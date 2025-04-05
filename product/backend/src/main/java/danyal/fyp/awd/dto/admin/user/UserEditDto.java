package danyal.fyp.awd.dto.admin.user;

import java.util.UUID;

public record UserEditDto(UUID id, String username, String email, String password, String role, String qualification) {
    public UserEditDto {
        // Convert plain "Admin"/"User" to "ROLE_ADMIN"/"ROLE_USER"
        role = switch (role) {
            case "Admin" -> "ROLE_ADMIN";
            case "User" -> "ROLE_USER";
            default -> role; // leave unchanged if it's already "ROLE_ADMIN"/"ROLE_USER" or something else
        };
    }
}
