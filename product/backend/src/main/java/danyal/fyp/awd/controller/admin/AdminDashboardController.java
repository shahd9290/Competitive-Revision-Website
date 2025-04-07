package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.ActivityLogDto;
import danyal.fyp.awd.dto.admin.DashboardDto;
import danyal.fyp.awd.dto.admin.DashboardInfoDto;
import danyal.fyp.awd.service.admin.AdminService;
import danyal.fyp.awd.service.admin.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDashboardController {


    private final AdminService adminService;
    private final LogService logService;

    @GetMapping("/dashboard")
    public ResponseEntity<Object> loadDashboard() {
        try {
            DashboardInfoDto response = adminService.loadDashboard();
            List<ActivityLogDto> logs = logService.getLogs();

            return ResponseEntity.ok(new DashboardDto(response,logs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
