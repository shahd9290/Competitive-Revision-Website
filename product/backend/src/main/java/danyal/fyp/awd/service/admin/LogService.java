package danyal.fyp.awd.service.admin;

import danyal.fyp.awd.model.admin.Log;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.admin.LogRepository;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.user.JwtService;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository logRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public void addLog(String token, String action) {
        Log log = new Log();
        String username = jwtService.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).get();
        saveLog(user, action);
    }

    public void addLog(User user, String action) {
        saveLog(user, action);
    }

    private void saveLog(User user, String action) {
        Log log = new Log();
        log.setUser(user);
        log.setActivity(action);
        log.setDate(Instant.now());
        logRepository.save(log);
    }

    public List<Log> getLogs() {
        return logRepository.findAll();
    }

    public void deleteUserLogs(User user) {
        logRepository.deleteUserLogs(user);
    }
}
