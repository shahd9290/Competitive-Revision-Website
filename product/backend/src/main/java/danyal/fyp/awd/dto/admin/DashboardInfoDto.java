package danyal.fyp.awd.dto.admin;

import danyal.fyp.awd.dto.admin.user.UserAttemptAdminDto;

import java.util.List;

public record DashboardInfoDto(int totalQuestions, int totalTopics, int totalSubjects, int totalUsers, int totalQualifications, List<UserAttemptAdminDto> recentAttempts) {
}
