package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.UserAttemptDto;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.model.user.AttemptId;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.model.user.UserAttempts;
import danyal.fyp.awd.repository.user.UserAttemptsRepository;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserAttemptsService {

    private final JwtService jwtService;
    private final UserService userService;
    private final SubjectTopicService subjectTopicService;
    private final UserAttemptsRepository userAttemptsRepository;

    public void addAttempt(String accessToken, int topicId, double proportion) {
        String username = jwtService.extractUsernameFromToken(accessToken);

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
//        topicname
//        date - epoch?
//        proportion
        List<UserAttempts> attempts = userAttemptsRepository.findRecentAttempts(user);
        List<UserAttemptDto> filteredAttempts = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy HH:mm");

        for (UserAttempts attempt : attempts) {
            String topicName = attempt.getTopic().getName();
            LocalDateTime date = attempt.getId().getDate().atZone(ZoneId.systemDefault()).toLocalDateTime();
            String dateString = date.format(formatter);
            double proportion = attempt.getProportion();
            filteredAttempts.add(new UserAttemptDto(topicName, dateString, proportion));
        }
        return filteredAttempts;
    }
}
