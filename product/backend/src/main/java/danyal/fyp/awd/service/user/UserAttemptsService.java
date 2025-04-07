package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.admin.user.UserAttemptAdminDto;
import danyal.fyp.awd.dto.user.profile.UserAttemptDto;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.model.user.AttemptId;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.model.user.UserAttempts;
import danyal.fyp.awd.repository.user.UserAttemptsRepository;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.misc.Triple;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserAttemptsService {

    private final JwtService jwtService;
    private final UserService userService;
    private final SubjectTopicService subjectTopicService;
    private final UserAttemptsRepository userAttemptsRepository;

    public void addAttempt(String accessToken, int topicId, double proportion) {
        String username = jwtService.getUserNameFromJwtToken(accessToken);

        User user = userService.getUserByUsername(username);
        Topic topic = subjectTopicService.getTopic(topicId);
        Instant now = Instant.now();
        AttemptId attemptId = new AttemptId(user.getId(), topic.getId(), now);

        UserAttempts attempts = new UserAttempts();
        attempts.setId(attemptId);
        attempts.setUser(user);
        attempts.setTopic(topic);
        attempts.setProportion(proportion);

        userAttemptsRepository.save(attempts);
    }

    public List<UserAttemptDto> getLatestAttempts(User user) {
        List<UserAttempts> attempts = userAttemptsRepository.findRecentAttempts(user);
        List<UserAttemptDto> filteredAttempts = new ArrayList<>();
        String dateFormat = "MMMM d, yyyy HH:mm";
        for (UserAttempts attempt : attempts) {
            Triple<String, String, String> processedAttempt = processAttempt(attempt, dateFormat);
            filteredAttempts.add(new UserAttemptDto(processedAttempt.a, processedAttempt.b, processedAttempt.c));
        }
        return filteredAttempts;
    }

    public void deleteAttempts(UUID userId) {
        User user = userService.getUserById(userId);
        userAttemptsRepository.deleteByIdUserId(user);
    }

    public void deleteAttempts(int topicId) {
        Topic topic = subjectTopicService.getTopic(topicId);
        userAttemptsRepository.deleteByIdTopicId(topic);
    }

    public List<UserAttemptAdminDto> getAttempts() {
        List<UserAttempts> attempts = userAttemptsRepository.findRecentAttempts();
        List<UserAttemptAdminDto> filteredAttempts = new ArrayList<>();
        String dateFormat = "YYYY-MM-dd HH:mm";
        int id = 0;
        for (UserAttempts attempt : attempts) {
            String user = attempt.getUser().getUsername();
            Triple<String, String, String> processedAttempt = processAttempt(attempt, dateFormat);
            filteredAttempts.add(new UserAttemptAdminDto(++id, user, processedAttempt.a, processedAttempt.b, processedAttempt.c));
        }
        return filteredAttempts;
    }

    private Triple<String, String, String> processAttempt(UserAttempts attempt, String dateFormat) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(dateFormat);
        String topicName = attempt.getTopic().getName();
        LocalDateTime date = attempt.getId().getDate().atZone(ZoneId.systemDefault()).toLocalDateTime();
        String dateString = date.format(formatter);
        String proportion = String.format("%.1f%%", attempt.getProportion()*100);

        return new Triple<>(topicName, proportion, dateString);
    }
}
