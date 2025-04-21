package danyal.fyp.awd.service.admin;

import danyal.fyp.awd.dto.admin.DashboardInfoDto;
import danyal.fyp.awd.dto.admin.user.UserAttemptAdminDto;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.QuestionService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import danyal.fyp.awd.service.user.UserAttemptsService;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling administrative operations.
 * Aggregates data from different services to load the dashboard and provide necessary statistics.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class AdminService {
    private final QuestionService questionService;
    private final SubjectTopicService subjectTopicService;
    private final UserService userService;
    private final QualificationService qualificationService;
    private final UserAttemptsService userAttemptsService;

    /**
     * Loads the dashboard data, including the total count of questions, topics, subjects, users, and qualifications,
     * as well as the most recent user attempts.
     *
     * @return a {@link DashboardInfoDto} containing the aggregated statistics for the admin dashboard
     */
    public DashboardInfoDto loadDashboard() {
        int totalQuestions = questionService.countQuestions();
        int totalTopics = subjectTopicService.countTopics();
        int totalSubjects = subjectTopicService.countSubjects();
        int totalUsers = userService.countUsers();
        int totalQualifications = qualificationService.countQualifications();
        List<UserAttemptAdminDto> recentAttempts = userAttemptsService.getAttempts();

        DashboardInfoDto response = new DashboardInfoDto(totalQuestions, totalTopics, totalSubjects, totalUsers, totalQualifications, recentAttempts);
        return response;
    }
}
