package danyal.fyp.awd.dto.admin.qualification;

/**
 * Data transfer object representing qualification information for admin use.
 *
 * @param id the unique identifier of the qualification
 * @param qualification the name or title of the qualification
 * @param subjectsNum the number of subjects associated with this qualification
 * @param usersNum the number of users enrolled in this qualification
 * @author Danyal Shah
 */
public record QualificationDataDto(int id, String qualification, int subjectsNum, int usersNum) {
}
