package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.repository.subject.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public void addSubject(String subjectName, Qualification qualification) {

        Set<Qualification> subjectQuals = new HashSet<>();
        subjectQuals.add(qualification);

        Subject subject = new Subject();
        subject.setName(subjectName);
        subject.setQualifications(subjectQuals);

        subjectRepository.save(subject);
    }

    public Optional<Subject> getSubject(String name) {
        return subjectRepository.findByName(name);
    }

    public void addQualification(Subject subject, Qualification qualification) {
        subject.addQualification(qualification);
        subjectRepository.save(subject);
    }
}
