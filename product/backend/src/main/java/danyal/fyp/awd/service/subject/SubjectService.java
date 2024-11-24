package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.subject.SubjectAllResultDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.repository.subject.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final QualificationService qualificationService;

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

    public List<SubjectAllResultDto> getAllSubjects(String qualName) throws QualificationException {
        Qualification qualification = qualificationService.getQualification(qualName);
        return subjectRepository.findSubjectsByQualificationId(qualification.getId());
    }

    public void addQualification(Subject subject, Qualification qualification) {
        subject.addQualification(qualification);
        subjectRepository.save(subject);
    }
}
