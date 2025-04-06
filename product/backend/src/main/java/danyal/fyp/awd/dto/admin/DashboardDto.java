package danyal.fyp.awd.dto.admin;

import java.util.List;

public record DashboardDto(int totalQuestions, int totalTopics, int totalSubjects, int totalUsers, int totalQualifications, List<danyal.fyp.awd.dto.admin.user.UserAttemptAdminDto> recentAttempts) {
}
