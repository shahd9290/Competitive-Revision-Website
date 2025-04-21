package danyal.fyp.awd.dto.admin;

import java.util.List;

/**
 * Data transfer object representing the admin dashboard data.
 * Includes overall dashboard information and recent activity logs.
 *
 * @param dashboard the main dashboard statistics and metrics
 * @param logs the list of recent admin activity logs
 * @author Danyal Shah
 */
public record DashboardDto(DashboardInfoDto dashboard, List<ActivityLogDto> logs) {
}
