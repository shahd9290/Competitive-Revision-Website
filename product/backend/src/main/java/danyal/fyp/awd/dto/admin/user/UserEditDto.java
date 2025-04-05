package danyal.fyp.awd.dto.admin.user;

import java.util.UUID;

public record UserEditDto(UUID id, String username, String email, String password, String role, String qualification) {

}
