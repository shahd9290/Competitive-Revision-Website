package danyal.fyp.awd.service.admin;

import danyal.fyp.awd.dto.admin.ActivityLogDto;
import danyal.fyp.awd.model.admin.Log;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.admin.LogRepository;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.user.JwtService;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing activity logs.
 * Provides methods for adding logs, retrieving logs, and formatting log timestamps.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository logRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    /**
     * Adds a log entry for a user based on a provided token and action.
     *
     * @param token the authentication token of the user
     * @param action the action performed by the user
     */
    public void addLog(String token, String action) {
        Log log = new Log();
        String username = jwtService.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).get();
        saveLog(user, action);
    }

    /**
     * Adds a log entry for a specified user and action.
     *
     * @param user the user who performed the action
     * @param action the action performed by the user
     */
    public void addLog(User user, String action) {
        saveLog(user, action);
    }

    /**
     * Saves the log entry to the repository.
     *
     * @param user the user associated with the log
     * @param action the action performed by the user
     */
    private void saveLog(User user, String action) {
        Log log = new Log();
        log.setUser(user);
        log.setActivity(action);
        log.setDate(Instant.now());
        logRepository.save(log);
    }

    /**
     * Retrieves the most recent logs and formats the timestamp.
     *
     * @return a list of {@link ActivityLogDto} containing formatted log entries
     */
    public List<ActivityLogDto> getLogs() {
        List<Log> logs = logRepository.getLatest();
        List<ActivityLogDto> filteredLogs = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Log log : logs) {
            int id = log.getId();
            String user = log.getUser().getUsername();
            String[] activity = log.getActivity().split(":", 2);
            String action = activity[0];
            String target = activity[1].trim();
            String date = formatRelativeDateTime(log.getDate());

            filteredLogs.add(new ActivityLogDto(id, user, action, target, date));
        }
        return filteredLogs;
    }

    /**
     * Deletes all logs associated with a specific user.
     *
     * @param user the user whose logs are to be deleted
     */
    public void deleteUserLogs(User user) {
        logRepository.deleteUserLogs(user);
    }

    /**
     * Formats the timestamp to a relative date and time (e.g., "Today", "Yesterday", or number of days ago).
     *
     * @param timestamp the timestamp to format
     * @return a formatted string representing the relative date and time
     */
    private String formatRelativeDateTime(Instant timestamp) {
        LocalDateTime dateTime = timestamp.atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDate today = LocalDate.now();
        LocalDate date = dateTime.toLocalDate();

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        String timePart = dateTime.format(timeFormatter);

        if (date.equals(today)) {
            return "Today, " + timePart;
        } else if (date.equals(today.minusDays(1))) {
            return "Yesterday, " + timePart;
        } else {
            long daysAgo = ChronoUnit.DAYS.between(date, today);
            return daysAgo + " days ago, " + timePart;
        }
    }
}
