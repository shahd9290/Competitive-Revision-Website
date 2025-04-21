package danyal.fyp.awd.dto.admin.user;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * A DTO representing detailed user information for admin purposes.
 * Includes basic account data and a formatted timestamp for user creation.
 *
 * @param id the unique identifier of the user
 * @param username the username of the user
 * @param email the user's email address
 * @param role the user's role (e.g., Admin or User)
 * @param createdAt the account creation date as a formatted string
 * @param qualification the qualification associated with the user, or "N/A" if none
 * @author Danyal Shah
 */
public record UserDataDto(UUID id, String username, String email, String role, String createdAt, String qualification) {

    /**
     * Constructs a UserDataDto with formatted role and creation date.
     *
     * @param id the user's UUID
     * @param username the user's username
     * @param email the user's email
     * @param role the user's role in raw form (e.g., ROLE_ADMIN)
     * @param createdAt the account creation timestamp
     * @param qualification the user's qualification, may be null
     */
    public UserDataDto(UUID id, String username, String email, String role, Instant createdAt, String qualification) {
        this(id, username, email, getRoleLabel(role), formatDate(createdAt), qualification != null ? qualification : "N/A");
    }

    /**
     * Formats an {@link Instant} to a readable date string.
     *
     * @param instant the instant to format
     * @return a formatted date string (e.g., "April 21, 2025 14:30")
     */
    private static String formatDate(Instant instant) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy HH:mm");
        LocalDateTime date = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        return date.format(formatter);
    }

    /**
     * Converts a role constant into a human-readable label.
     *
     * @param role the raw role string (e.g., "ROLE_ADMIN")
     * @return a more readable label (e.g., "Admin")
     */
    private static String getRoleLabel(String role) {
        return switch (role) {
            case "ROLE_ADMIN" -> "Admin";
            case "ROLE_USER" -> "User";
            default -> role;
        };
    }
}
