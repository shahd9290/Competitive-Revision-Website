package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.repository.subject.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public void saveSubject(Subject subject) {
        subjectRepository.save(subject);
    }

    public Optional<Subject> getSubject(String name) {
        return subjectRepository.findByName(name);
    }

}
