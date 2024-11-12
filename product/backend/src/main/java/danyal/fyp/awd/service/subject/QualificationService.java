package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.repository.subject.QualificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QualificationService {

    private final QualificationRepository qualificationRepository;

    public void saveQualification(Qualification qualification) {
        qualificationRepository.save(qualification);
    }

    public boolean doesExist(String name) {
        return qualificationRepository.existsByName(name);
    }

    public Optional<Qualification> getQualification(String name) {
        return qualificationRepository.findByName(name);
    }

}
