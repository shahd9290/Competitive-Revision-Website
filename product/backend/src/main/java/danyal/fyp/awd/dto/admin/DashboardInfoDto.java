package danyal.fyp.awd.dto.admin;

import danyal.fyp.awd.dto.admin.user.UserAttemptAdminDto;

import java.util.List;

/**
 * A DTO containing statistical information for the admin dashboard.
 * Includes counts for questions, topics, subjects, users, qualifications, and recent attempts.
 *
 * @param totalQuestions the total number of questions in the system
 * @param totalTopics the total number of topics
 * @param totalSubjects the total number of subjects
 * @param totalUsers the total number of registered users
 * @param totalQualifications the total number of qualifications available
 * @param recentAttempts the list of most recent user attempts for admin overview
 * @author Danyal Shah
 */
public record DashboardInfoDto(int totalQuestions, int totalTopics, int totalSubjects, int totalUsers, int totalQualifications, List<UserAttemptAdminDto> recentAttempts) {
}
