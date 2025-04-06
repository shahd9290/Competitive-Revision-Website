package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.DashboardDto;
import danyal.fyp.awd.dto.admin.user.UserAttemptAdminDto;
import danyal.fyp.awd.model.user.UserAttempts;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.QuestionService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import danyal.fyp.awd.service.user.UserAttemptsService;
import danyal.fyp.awd.service.user.UserService;
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
    private final QuestionService questionService;
    private final SubjectTopicService subjectTopicService;
    private final UserService userService;
    private final QualificationService qualificationService;
    private final UserAttemptsService userAttemptsService;

    @GetMapping("/dashboard")
    public ResponseEntity<Object> loadDashboard() {
        try {
            int totalQuestions = questionService.countQuestions();
            int totalTopics = subjectTopicService.countTopics();
            int totalSubjects = subjectTopicService.countSubjects();
            int totalUsers = userService.countUsers();
            int totalQualifications = qualificationService.countQualifications();
            List<UserAttemptAdminDto> recentAttempts = userAttemptsService.getAttempts();

            DashboardDto response = new DashboardDto(totalQuestions, totalTopics, totalSubjects, totalUsers, totalQualifications, recentAttempts);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
