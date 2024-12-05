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

@Service
@RequiredArgsConstructor
public class SubjectTopicService {

    private final SubjectRepository subjectRepository;
    private final QualificationService qualificationService;
    private final TopicRepository topicRepository;

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

    public List<Subject> getSubjectWithQual(Qualification qualification) {
        return subjectRepository.findSubjectsByQualificationId(qualification.getId());
    }

    public List<SubjectAllResultDto> getAllSubjects(String qualName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        List<Subject> subjectResults = getSubjectWithQual(qualification);
        List<SubjectAllResultDto> subjectAllResultDtos = new ArrayList<>();

        // Get the topics specifically for the given qualification. This way there is no clashes.
        for (Subject subject : subjectResults) {
            List<Topic> topics = getAllForSubQual(subject.getName(), qualification.getName());
            SubjectAllResultDto subjectAllResultDto = new SubjectAllResultDto(subject.getId(), subject.getName(), topics);
            subjectAllResultDtos.add(subjectAllResultDto);
        }

        return subjectAllResultDtos;
    }

    public void addQualification(Subject subject, Qualification qualification) {
        subject.addQualification(qualification);
        subjectRepository.save(subject);
    }

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

    public Topic getTopic(String topicName, int qualificationId) {
        return topicRepository.findByNameAndQualificationId(topicName, qualificationId).orElse(null);
    }

    public List<Topic> getAllForSubQual(String subName, String qualName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));

        return topicRepository.findAllBySubjectIdAndQualificationId(subject.getId(), qualification.getId());
    }
}
