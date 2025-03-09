package danyal.fyp.awd.dto.admin;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public record UserDataDto (String username, String email, String role, String createdAt, String qualification) {
    public UserDataDto (String username, String email, String role, Instant createdAt, String qualification) {
        this(username, email, getRoleLabel(role), formatDate(createdAt), qualification);
    }

    private static String formatDate (Instant instant) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy HH:mm");
        LocalDateTime date = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        return date.format(formatter);
    }

    private static
    String getRoleLabel(String role) {
        return switch (role) {
            case "ROLE_ADMIN" -> "Admin";
            case "ROLE_USER" -> "User";
            default -> role;
        };
    }
}
