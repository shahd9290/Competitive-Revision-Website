package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.repository.subject.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
}
