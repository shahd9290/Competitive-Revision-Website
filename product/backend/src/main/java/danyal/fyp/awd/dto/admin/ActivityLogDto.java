package danyal.fyp.awd.dto.admin;

public record ActivityLogDto(int id, String user, String action, String target, String timestamp) {
}
