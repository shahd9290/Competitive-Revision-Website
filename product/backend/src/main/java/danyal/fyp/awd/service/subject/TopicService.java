package danyal.fyp.awd.service.subject;

import danyal.fyp.awd.dto.subject.TopicDto;
import danyal.fyp.awd.exception.SubjectException;
import danyal.fyp.awd.exception.TopicException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.repository.subject.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;
    private final QualificationService qualificationService;
    private final SubjectService subjectService;


    public void saveTopic(TopicDto topicDto) throws Exception {
        String qualName = topicDto.qualification();
        String subName = topicDto.subject();
        String topicName = topicDto.name();

        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = subjectService.getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));

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

    public List<Topic> getAllForSubQual(String qualName, String subName) throws Exception {
        Qualification qualification = qualificationService.getQualification(qualName);
        Subject subject = subjectService.getSubject(subName).orElseThrow(() -> new SubjectException("Subject Does Not Exist"));

        return topicRepository.findAllBySubjectIdAndQualificationId(subject.getId(), qualification.getId());
    }
}
