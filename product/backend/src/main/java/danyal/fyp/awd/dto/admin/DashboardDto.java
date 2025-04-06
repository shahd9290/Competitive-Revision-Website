package danyal.fyp.awd.dto.admin;

import java.util.List;

public record DashboardDto(DashboardInfoDto dashboard, List<ActivityLogDto> logs) {
}
