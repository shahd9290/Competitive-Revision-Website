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
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class for managing subjects and topics.
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
     * @param subjectName   the name of the subject.
     * @param qualification the qualification to associate with the subject.
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
     * @param name the name of the subject.
     * @return an {@link Optional} containing the subject if found, or empty otherwise.
     */
    public Optional<Subject> getSubject(String name) {
        return subjectRepository.findByName(name);
    }

    /**
     * Retrieves subjects associated with a given qualification.
     *
     * @param qualification the qualification to filter by.
     * @return a list of subjects associated with the qualification.
     */
    public List<Subject> getSubjectWithQual(Qualification qualification) {
        return subjectRepository.findSubjectsByQualificationId(qualification.getId());
    }

    /**
     * Retrieves all subjects along with their topics for a given qualification.
     *
     * @param qualName the name of the qualification.
     * @return a list of {@link SubjectAllResultDto} containing subjects and their topics.
     * @throws Exception if the qualification does not exist.
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

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    /**
     * Adds a qualification to an existing subject.
     *
     * @param subject       the subject to update.
     * @param qualification the qualification to add.
     */
    public void addQualification(Subject subject, Qualification qualification, String token) {
        subject.addQualification(qualification);
        subjectRepository.save(subject);
        logService.addLog(token, EDIT_SUBJECT.formatted(subject.getName(), "New Qualification: %s".formatted(qualification.getName())));
    }

    /**
     * Saves a new topic based on the provided DTO.
     *
     * @param topicDto the {@link TopicDto} containing topic details.
     * @throws Exception if the qualification, subject, or topic does not exist or already exists.
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
     * @param topicName       the name of the topic.
     * @param qualificationId the ID of the qualification.
     * @return the {@link Topic} if found
     * @throws TopicException if the topic was not found.
     */
    public Topic getTopic(String topicName, int qualificationId) {
        return topicRepository.findByNameAndQualificationId(topicName, qualificationId).orElse(null);
    }

    /**
     * Retrieves a topic by its name and qualification ID.
     *
     * @param topicId       the id of the topic.
     * @return the {@link Topic} if found
     * @throws TopicException if the topic was not found.
     */
    public Topic getTopic(int topicId) {
        Topic topic;
        if ((topic = topicRepository.findById(topicId).orElse(null)) == null)
            throw new TopicException("Topic does not exist");
        return topic;
    }

    /**
     * Retrieves all topics for a specific subject and qualification.
     *
     * @param qualName the name of the qualification.
     * @param subName  the name of the subject.
     * @return a list of topics associated with the subject and qualification.
     * @throws Exception if the qualification or subject does not exist.
     */
    public List<TopicCountDto> getAllForSubQual(String qualName, String subName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));
        return topicRepository.findAllBySubjectIdAndQualificationId(subject, qualification);
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public List<SubjectDataDto> getAllSubjectsAdmin() {
        return subjectRepository.findAllDetails();
    }

    public List<TopicDataDto> getAllTopicsAdmin() {
        return topicRepository.findTopicDetails();
    }

    public void deleteSubject(SubjectDeleteDto subjectDeleteDto, String token) throws QualificationException {
        Subject sub = subjectRepository.findById(subjectDeleteDto.id()).get();
        if (sub.getQualifications().size() == 1) {
            subjectRepository.deleteById(subjectDeleteDto.id());
            logService.addLog(token, DELETE_SUBJECT.formatted(sub.getName()));
        }
        else {
            Qualification qual = qualificationService.getQualification(subjectDeleteDto.qualification());
            sub.removeQual(qual);
            subjectRepository.save(sub);
            logService.addLog(token, EDIT_SUBJECT.formatted(sub.getName(), "Removed Qualification %s".formatted(qual.getName())));
        }
    }

    public void deleteTopic(int id, String token) {
        Topic topic = getTopic(id);
        topicRepository.deleteById(id);
        logService.addLog(token, DELETE_TOPIC.formatted(topic.getSubject().getName(), topic.getName()));
    }

    public void editSubject(SubjectEditDto subjectEditDto, String token) throws QualificationException {

        Subject sub = subjectRepository.findById(subjectEditDto.id()).get();
        String oldSubjectName = sub.getName();
        String oldQualName = sub.getQualification().getName();
        sub.setName(subjectEditDto.subject());
        if (!subjectEditDto.qualification().equals("")) {
            sub.setQualification(qualificationService.getQualification(subjectEditDto.qualification()));
        }
        subjectRepository.save(sub);
        logService.addLog(token, EDIT_SUBJECT.formatted(oldSubjectName, "%s -> %s, %s -> %s".formatted(oldSubjectName, sub.getName(), oldQualName, subjectEditDto.qualification())));
    }

    public void editTopic(TopicEditDto topicEditDto, String token) throws QualificationException {
        Topic t = topicRepository.findById(topicEditDto.id()).get();
        String oldTopic = t.getName();
        String oldSubject = t.getSubject().getName();
        String oldQual = t.getQualification().getName();
        t.setName(topicEditDto.topic());
        String message = "%s -> %s".formatted(oldTopic, t.getName());
        if (!topicEditDto.subject().equals("")) {
            t.setSubject(getSubject(topicEditDto.subject()).get());
            message += ", %s -> %s".formatted(oldSubject, t.getSubject().getName());
        }
        if (!topicEditDto.qualification().equals("")) {
            t.setQualification(qualificationService.getQualification(topicEditDto.qualification()));
            message += ", %s -> %s".formatted(oldQual, t.getQualification().getName());
        }
        topicRepository.save(t);
        logService.addLog(token, EDIT_TOPIC.formatted(t.getSubject().getName(), oldTopic, message));
    }

    public int countTopics() {
        return (int) topicRepository.count();
    }

    public int countSubjects() {
        return (int) subjectRepository.count();
    }
}
