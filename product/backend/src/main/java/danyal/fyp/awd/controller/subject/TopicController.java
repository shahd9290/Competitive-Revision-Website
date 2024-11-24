package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.TopicDto;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.service.subject.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/topic")
public class TopicController {

    private final TopicService topicService;

    @PostMapping("/add")
    public ResponseEntity<String> addTopic(@RequestBody final TopicDto topicDto) {
        try {
            topicService.saveTopic(topicDto);
            return ResponseEntity.ok("Topic saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/get-all")
    public ResponseEntity<Object> getAllTopics(@RequestParam String qualification, @RequestParam String subject) {
        try {
            List<Topic> topics = topicService.getAllForSubQual(qualification, subject);
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
