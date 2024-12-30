package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.repository.subject.QualificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing {@link Qualification} entities.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class QualificationService {

    private final QualificationRepository qualificationRepository;

    /**
     * Saves a qualification entity to the database.
     *
     * @param qualification the qualification to save.
     */
    public void saveQualification(Qualification qualification) throws QualificationException {
        if (qualificationRepository.findByName(qualification.getName()).isPresent())
            throw new QualificationException("Qualification Already Exists.");
        qualificationRepository.save(qualification);
    }

    /**
     * Retrieves a qualification by its name.
     *
     * @param name the name of the qualification.
     * @return the {@link Qualification} entity.
     * @throws QualificationException if the qualification does not exist.
     */
    public Qualification getQualification(String name) throws QualificationException {
        return qualificationRepository.findByName(name).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
    }

    /**
     * Retrieves a qualification by its ID.
     *
     * @param id the ID of the qualification.
     * @return the {@link Qualification} entity.
     * @throws QualificationException if the qualification does not exist.
     */
    public Qualification getQualification(int id) throws QualificationException {
        return qualificationRepository.findById(id).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
    }

    /**
     * Retrieves all qualifications from the database.
     *
     * @return a list of all {@link Qualification} entities.
     */
    public List<Qualification> getAllQualifications() {
        return qualificationRepository.findAll();
    }

    /**
     * Retrieves the ID of a qualification by its name.
     *
     * @param qualificationName the name of the qualification.
     * @return the ID of the qualification.
     * @throws QualificationException if the qualification does not exist.
     */
    public int getIdByName(String qualificationName) throws QualificationException {
        Qualification qualification = getQualification(qualificationName);
        return qualification.getId();
    }

}
