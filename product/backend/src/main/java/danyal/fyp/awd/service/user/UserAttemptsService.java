package danyal.fyp.awd.service.user;

import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.model.user.AttemptId;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.model.user.UserAttempts;
import danyal.fyp.awd.repository.user.UserAttemptsRepository;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@AllArgsConstructor
public class UserAttemptsService {

    private final JwtService jwtService;
    private final UserService userService;
    private final SubjectTopicService subjectTopicService;
    private final UserAttemptsRepository userAttemptsRepository;

    public void addAttempt(String accessToken, int topicId) {
        String username = jwtService.extractUsernameFromToken(accessToken);

        User user = userService.getUserByUsername(username);
        Topic topic = subjectTopicService.getTopic(topicId);
        Instant now = Instant.now();
        AttemptId attemptId = new AttemptId(user.getId(), topic.getId(), now);

        UserAttempts attempts = new UserAttempts();
        attempts.setId(attemptId);
        attempts.setUser(user);
        attempts.setTopic(topic);

        userAttemptsRepository.save(attempts);
    }
}
