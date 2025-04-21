package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.admin.subject.SubjectDataDto;
import danyal.fyp.awd.dto.admin.subject.SubjectDeleteDto;
import danyal.fyp.awd.dto.admin.subject.SubjectEditDto;
import danyal.fyp.awd.dto.admin.topic.TopicDataDto;
import danyal.fyp.awd.dto.admin.topic.TopicEditDto;
import danyal.fyp.awd.dto.subject.SubjectAllResultDto;
import danyal.fyp.awd.dto.admin.topic.TopicDto;
import danyal.fyp.awd.dto.subject.TopicCountDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.exception.SubjectException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.SubjectRepository;
import danyal.fyp.awd.repository.subject.TopicRepository;
import danyal.fyp.awd.service.admin.LogService;
import danyal.fyp.awd.service.user.UserAttemptsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class for managing subjects and topics.
 * Provides methods for creating, editing, deleting, and retrieving subjects and topics.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class SubjectTopicService {

    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;
    private final QualificationService qualificationService;
    private final LogService logService;

    private final String ADD_SUBJECT = "Created New Subject: %s";
    private final String EDIT_SUBJECT = "Edited Subject %s: %s";
    private final String DELETE_SUBJECT = "Deleted Subject: %s";
    private final String ADD_TOPIC = "Created New %s Topic: %s";
    private final String EDIT_TOPIC = "Edited %s Topic %s: %s";
    private final String DELETE_TOPIC = "Deleted %s Topic: %s";

    /**
     * Adds a new subject with an associated qualification.
     *
     * @param subjectName the name of the subject
     * @param qualification the qualification to associate with the subject
     * @param token the authentication token of the user performing the action
     */
    public void addSubject(String subjectName, Qualification qualification, String token) {

        Set<Qualification> subjectQuals = new HashSet<>();
        subjectQuals.add(qualification);

        Subject subject = new Subject();
        subject.setName(subjectName);
        subject.setQualifications(subjectQuals);

        subjectRepository.save(subject);
        logService.addLog(token, ADD_SUBJECT.formatted(subjectName));
    }

    /**
     * Retrieves a subject by its name.
     *
     * @param name the name of the subject
     * @return an {@link Optional} containing the subject if found, or empty otherwise
     */
    public Optional<Subject> getSubject(String name) {
        return subjectRepository.findByName(name);
    }

    /**
     * Retrieves all subjects associated with a specific qualification.
     *
     * @param qualification the qualification to filter subjects by
     * @return a list of {@link Subject} entities associated with the qualification
     */
    public List<Subject> getSubjectWithQual(Qualification qualification) {
        return subjectRepository.findSubjectsByQualificationId(qualification.getId());
    }

    /**
     * Retrieves all subjects and their associated topics for a specific qualification.
     *
     * @param qualName the name of the qualification
     * @return a list of {@link SubjectAllResultDto} containing subject and topic details
     * @throws Exception if the qualification does not exist
     */
    public List<SubjectAllResultDto> getAllSubjects(String qualName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        List<Subject> subjectResults = getSubjectWithQual(qualification);
        List<SubjectAllResultDto> subjectAllResultDtos = new ArrayList<>();

        // Get the topics specifically for the given qualification. This way there is no clashes.
        for (Subject subject : subjectResults) {
            List<TopicCountDto> topics = getAllForSubQual(qualification.getName(), subject.getName());
            SubjectAllResultDto subjectAllResultDto = new SubjectAllResultDto(subject.getId(), subject.getName(), topics);
            subjectAllResultDtos.add(subjectAllResultDto);
        }

        return subjectAllResultDtos;
    }

    /**
     * Retrieves all subjects from the database.
     *
     * @return a list of all {@link Subject} entities
     */
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    /**
     * Adds a qualification to an existing subject.
     *
     * @param subject the subject to update
     * @param qualification the qualification to add to the subject
     * @param token the authentication token of the user performing the action
     */
    public void addQualification(Subject subject, Qualification qualification, String token) {
        subject.addQualification(qualification);
        subjectRepository.save(subject);
        logService.addLog(token, EDIT_SUBJECT.formatted(subject.getName(), "New Qualification: %s".formatted(qualification.getName())));
    }

    /**
     * Saves a new topic based on the provided {@link TopicDto}.
     *
     * @param topicDto the DTO containing topic details
     * @param token the authentication token of the user performing the action
     * @throws Exception if the topic or subject does not exist or already exists
     */
    public void saveTopic(TopicDto topicDto, String token) throws Exception {
        String qualName = topicDto.qualification();
        String subName = topicDto.subject();
        String topicName = topicDto.name();

        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));

        Topic topic = getTopic(topicName, qualification.getId());
        if (topic != null) {
            throw new TopicException("Topic already exists");
        }

        topic = new Topic();
        topic.setName(topicName);
        topic.setQualification(qualification);
        topic.setSubject(subject);
        topicRepository.save(topic);
        logService.addLog(token, ADD_TOPIC.formatted(subject.getName(), topicName));
    }

    /**
     * Retrieves a topic by its name and qualification ID.
     *
     * @param topicName the name of the topic
     * @param qualificationId the ID of the qualification
     * @return the {@link Topic} entity if found
     * @throws TopicException if the topic does not exist
     */
    public Topic getTopic(String topicName, int qualificationId) {
        return topicRepository.findByNameAndQualificationId(topicName, qualificationId).orElse(null);
    }

    /**
     * Retrieves a topic by its ID.
     *
     * @param topicId the ID of the topic
     * @return the {@link Topic} entity if found
     * @throws TopicException if the topic does not exist
     */
    public Topic getTopic(int topicId) {
        Topic topic;
        if ((topic = topicRepository.findById(topicId).orElse(null)) == null)
            throw new TopicException("Topic does not exist");
        return topic;
    }

    /**
     * Retrieves all topics associated with a specific subject and qualification.
     *
     * @param qualName the name of the qualification
     * @param subName the name of the subject
     * @return a list of {@link TopicCountDto} containing topic details
     * @throws Exception if the qualification or subject does not exist
     */
    public List<TopicCountDto> getAllForSubQual(String qualName, String subName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));
        return topicRepository.findAllBySubjectIdAndQualificationId(subject, qualification);
    }

    /**
     * Retrieves detailed subject data for the admin view.
     *
     * @return a list of {@link SubjectDataDto} containing subject details
     */
    public List<SubjectDataDto> getAllSubjectsAdmin() {
        return subjectRepository.findAllDetails();
    }

    /**
     * Retrieves detailed topic data for the admin view.
     *
     * @return a list of {@link TopicDataDto} containing topic details
     */
    public List<TopicDataDto> getAllTopicsAdmin() {
        return topicRepository.findTopicDetails();
    }

    /**
     * Deletes a subject based on the provided DTO and logs the action.
     *
     * @param subjectDeleteDto the DTO containing the subject ID and qualification
     * @param token the authentication token of the user performing the action
     * @throws QualificationException if the qualification does not exist
     */
    public void deleteSubject(SubjectDeleteDto subjectDeleteDto, String token) throws QualificationException {
        Subject sub = subjectRepository.findById(subjectDeleteDto.id()).get();
        if (sub.getQualifications().size() == 1) {
            subjectRepository.deleteById(subjectDeleteDto.id());
            logService.addLog(token, DELETE_SUBJECT.formatted(sub.getName()));
        } else {
            Qualification qual = qualificationService.getQualification(subjectDeleteDto.qualification());
            sub.removeQual(qual);
            subjectRepository.save(sub);
            logService.addLog(token, EDIT_SUBJECT.formatted(sub.getName(), "Removed Qualification %s".formatted(qual.getName())));
        }
    }

    /**
     * Deletes a topic by its ID and logs the action.
     *
     * @param id the ID of the topic to delete
     * @param token the authentication token of the user performing the action
     */
    public void deleteTopic(int id, String token) {
        Topic topic = getTopic(id);
        topicRepository.deleteById(id);
        logService.addLog(token, DELETE_TOPIC.formatted(topic.getSubject().getName(), topic.getName()));
    }

    /**
     * Edits an existing subject and logs the changes.
     *
     * @param subjectEditDto the DTO containing updated subject data
     * @param token the authentication token of the user performing the action
     * @throws QualificationException if the qualification does not exist
     */
    public void editSubject(SubjectEditDto subjectEditDto, String token) throws QualificationException {

        Subject sub = subjectRepository.findById(subjectEditDto.id()).get();
        String oldSubjectName = sub.getName();
        String oldQualName = sub.getQualification().getName();
        sub.setName(subjectEditDto.subject());
        if (!subjectEditDto.qualification().equals("")) {
            sub.setQualification(qualificationService.getQualification(subjectEditDto.qualification()));
        }
        subjectRepository.save(sub);
        logService.addLog(token, EDIT_SUBJECT.formatted(oldSubjectName, "Title: %s -> %s, Qualification: %s -> %s".formatted(oldSubjectName, sub.getName(), oldQualName, subjectEditDto.qualification())));
    }

    /**
     * Edits an existing topic and logs the changes.
     *
     * @param topicEditDto the DTO containing updated topic data
     * @param token the authentication token of the user performing the action
     * @throws QualificationException if the qualification does not exist
     */
    public void editTopic(TopicEditDto topicEditDto, String token) throws QualificationException {
        Topic t = topicRepository.findById(topicEditDto.id()).get();
        String oldTopic = t.getName();
        String oldSubject = t.getSubject().getName();
        String oldQual = t.getQualification().getName();
        t.setName(topicEditDto.topic());
        String message = "Name: %s -> %s".formatted(oldTopic, t.getName());
        if (!topicEditDto.subject().equals("")) {
            t.setSubject(getSubject(topicEditDto.subject()).get());
            message += ", Subject: %s -> %s".formatted(oldSubject, t.getSubject().getName());
        }
        if (!topicEditDto.qualification().equals("")) {
            t.setQualification(qualificationService.getQualification(topicEditDto.qualification()));
            message += ", Qualification: %s -> %s".formatted(oldQual, t.getQualification().getName());
        }
        topicRepository.save(t);
        logService.addLog(token, EDIT_TOPIC.formatted(t.getSubject().getName(), oldTopic, message));
    }

    /**
     * Counts the total number of topics in the system.
     *
     * @return the total number of topics
     */
    public int countTopics() {
        return (int) topicRepository.count();
    }

    /**
     * Counts the total number of subjects in the system.
     *
     * @return the total number of subjects
     */
    public int countSubjects() {
        return (int) subjectRepository.count();
    }

    /**
     * Creates or updates a subject with its associated qualification.
     *
     * @param subjectName the name of the subject
     * @param subjectQual the qualification to associate with the subject
     * @param token the authentication token of the user performing the action
     * @return a message indicating the result of the operation
     * @throws QualificationException if the qualification does not exist
     */
    public String newSubject(String subjectName, String subjectQual, String token) throws QualificationException {
        // Check if Qualification exists?
        Qualification qualification = qualificationService.getQualification(subjectQual);
        // Check if subject exists now.
        Subject subject;
        if ((subject = getSubject(subjectName).orElse(null)) != null) {
            // Subject exists, does it already have the qualification?
            if (subject.getQualifications().contains(qualification)) {
                return "Subject already exists with this qualification!";
            }
            // It doesn't, needs to be updated.
            else {
                addQualification(subject, qualification, token);
                return "Updated Existing Subject with new qualification";
            }
        }
        // Subject does not exist. Qualification does so we can create a new one with it.
        else {
            addSubject(subjectName, qualification, token);
            return "Created new subject";
        }
    }
}
