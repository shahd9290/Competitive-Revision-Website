package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.admin.qualification.QualificationDataDto;
import danyal.fyp.awd.dto.admin.qualification.QualificationDto;
import danyal.fyp.awd.dto.admin.qualification.QualificationEditDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.repository.subject.QualificationRepository;
import danyal.fyp.awd.service.admin.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing {@link Qualification} entities.
 * Provides methods for creating, editing, deleting, and retrieving qualifications.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class QualificationService {

    private final QualificationRepository qualificationRepository;
    private final LogService logService;

    private final String ADD_QUALIFICATION = "Created New Qualification: %s";
    private final String EDIT_QUALIFICATION = "Edited Qualification %s: %s -> %s";
    private final String DELETE_QUALIFICATION = "Deleted Qualification: %s";

    /**
     * Saves a new qualification to the database.
     * Throws a {@link QualificationException} if the qualification already exists.
     *
     * @param qualification the qualification to save
     * @param token the authentication token of the user performing the action
     * @throws QualificationException if the qualification already exists
     */
    public void saveQualification(QualificationDto qualification, String token) throws QualificationException {
        if (qualificationRepository.findByName(qualification.qualification()).isPresent())
            throw new QualificationException("Qualification Already Exists.");
        Qualification q = new Qualification();
        q.setName(qualification.qualification());
        qualificationRepository.save(q);
        logService.addLog(token, ADD_QUALIFICATION.formatted(qualification.qualification()));
    }

    /**
     * Retrieves a qualification by its name.
     * Throws a {@link QualificationException} if the qualification does not exist.
     *
     * @param name the name of the qualification
     * @return the {@link Qualification} entity
     * @throws QualificationException if the qualification does not exist
     */
    public Qualification getQualification(String name) throws QualificationException {
        return qualificationRepository.findByName(name).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
    }

    /**
     * Retrieves a qualification by its ID.
     * Throws a {@link QualificationException} if the qualification does not exist.
     *
     * @param id the ID of the qualification
     * @return the {@link Qualification} entity
     * @throws QualificationException if the qualification does not exist
     */
    public Qualification getQualification(int id) throws QualificationException {
        return qualificationRepository.findById(id).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
    }

    /**
     * Retrieves all qualifications from the database.
     *
     * @return a list of all {@link Qualification} entities
     */
    public List<Qualification> getAllQualifications() {
        return qualificationRepository.findAll();
    }

    /**
     * Retrieves the ID of a qualification by its name.
     * Throws a {@link QualificationException} if the qualification does not exist.
     *
     * @param qualificationName the name of the qualification
     * @return the ID of the qualification
     * @throws QualificationException if the qualification does not exist
     */
    public int getIdByName(String qualificationName) throws QualificationException {
        Qualification qualification = getQualification(qualificationName);
        return qualification.getId();
    }

    /**
     * Retrieves detailed qualification data for the admin view.
     *
     * @return a list of {@link QualificationDataDto} containing detailed qualification data
     */
    public List<QualificationDataDto> getAllQualificationsAdmin() {
        return qualificationRepository.getAllData();
    }

    /**
     * Deletes a qualification by its name.
     * Throws a {@link QualificationException} if the qualification does not exist.
     *
     * @param name the name of the qualification to delete
     * @param token the authentication token of the user performing the action
     * @throws QualificationException if the qualification does not exist
     */
    public void delete(String name, String token) throws QualificationException {
        Qualification qual = qualificationRepository.findByName(name).orElseThrow(() -> new QualificationException("Qualification Does Not Exist"));
        qualificationRepository.delete(qual);
        logService.addLog(token, DELETE_QUALIFICATION.formatted(name));
    }

    /**
     * Edits an existing qualification.
     * Throws a {@link QualificationException} if the qualification does not exist.
     *
     * @param qualificationEditDto the new details for the qualification
     * @param token the authentication token of the user performing the action
     */
    public void editQualification(QualificationEditDto qualificationEditDto, String token) {
        Qualification qual = qualificationRepository.findById(qualificationEditDto.id()).get();
        String oldName = qual.getName();
        qual.setName(qualificationEditDto.qualification());
        qualificationRepository.save(qual);
        logService.addLog(token, EDIT_QUALIFICATION.formatted(oldName, oldName, qualificationEditDto.qualification()));
    }

    /**
     * Counts the total number of qualifications in the database.
     *
     * @return the total number of qualifications
     */
    public int countQualifications() {
        return (int) qualificationRepository.count();
    }
}
