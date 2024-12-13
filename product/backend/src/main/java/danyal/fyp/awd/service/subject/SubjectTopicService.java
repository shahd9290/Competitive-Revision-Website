package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.subject.SubjectAllResultDto;
import danyal.fyp.awd.dto.subject.TopicDto;
import danyal.fyp.awd.exception.SubjectException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.SubjectRepository;
import danyal.fyp.awd.repository.subject.TopicRepository;
import lombok.RequiredArgsConstructor;
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
    private final QualificationService qualificationService;
    private final TopicRepository topicRepository;

    /**
     * Adds a new subject with an associated qualification.
     *
     * @param subjectName   the name of the subject.
     * @param qualification the qualification to associate with the subject.
     */
    public void addSubject(String subjectName, Qualification qualification) {

        Set<Qualification> subjectQuals = new HashSet<>();
        subjectQuals.add(qualification);

        Subject subject = new Subject();
        subject.setName(subjectName);
        subject.setQualifications(subjectQuals);

        subjectRepository.save(subject);
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
            List<Topic> topics = getAllForSubQual(qualification.getName(), subject.getName());
            SubjectAllResultDto subjectAllResultDto = new SubjectAllResultDto(subject.getId(), subject.getName(), topics);
            subjectAllResultDtos.add(subjectAllResultDto);
        }

        return subjectAllResultDtos;
    }

    /**
     * Adds a qualification to an existing subject.
     *
     * @param subject       the subject to update.
     * @param qualification the qualification to add.
     */
    public void addQualification(Subject subject, Qualification qualification) {
        subject.addQualification(qualification);
        subjectRepository.save(subject);
    }

    /**
     * Saves a new topic based on the provided DTO.
     *
     * @param topicDto the {@link TopicDto} containing topic details.
     * @throws Exception if the qualification, subject, or topic does not exist or already exists.
     */
    public void saveTopic(TopicDto topicDto) throws Exception {
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

    }

    /**
     * Retrieves a topic by its name and qualification ID.
     *
     * @param topicName       the name of the topic.
     * @param qualificationId the ID of the qualification.
     * @return the {@link Topic} if found, or {@code null} otherwise.
     */
    public Topic getTopic(String topicName, int qualificationId) {
        return topicRepository.findByNameAndQualificationId(topicName, qualificationId).orElse(null);
    }

    /**
     * Retrieves all topics for a specific subject and qualification.
     *
     * @param qualName the name of the qualification.
     * @param subName  the name of the subject.
     * @return a list of topics associated with the subject and qualification.
     * @throws Exception if the qualification or subject does not exist.
     */
    public List<Topic> getAllForSubQual(String qualName, String subName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));

        return topicRepository.findAllBySubjectIdAndQualificationId(subject.getId(), qualification.getId());
    }
}
