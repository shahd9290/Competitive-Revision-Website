package danyal.fyp.awd.dto.admin;

/**
 * A DTO representing a single activity log entry.
 * Includes information about the user, action, target, and timestamp of the event.
 *
 * @param id the unique identifier of the log entry
 * @param user the user who performed the action
 * @param action the action that was performed (e.g., "DELETE", "EDIT")
 * @param target the entity or item on which the action was performed
 * @param timestamp the time at which the action occurred, formatted as a string
 * @author Danyal Shah
 */
public record ActivityLogDto(int id, String user, String action, String target, String timestamp) {
}
