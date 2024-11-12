package danyal.fyp.awd.repository.subject;

import danyal.fyp.awd.model.subject.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {

    boolean existsByName(String username);

    Optional<Qualification> findByName(String name); 

}
