package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.repository.subject.QualificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Qualification getQualification(String name) throws QualificationException {
        return qualificationRepository.findByName(name).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
    }

    public Qualification getQualification(int id) throws QualificationException {
        return qualificationRepository.findById(id).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
    }

    public List<Qualification> getAllQualifications() {
        return qualificationRepository.findAll();
    }

    public int getIdByName(String qualificationName) throws QualificationException {
        Qualification qualification = getQualification(qualificationName);
        return qualification.getId();
    }

}
