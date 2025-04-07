package danyal.fyp.awd.api.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.service.user.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
public class AdminQuestionControllerTest {
    private Map<String, Object> payload;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ObjectMapper objectMapper;
    private String token;

    private Cookie tokenCookie;

    @BeforeAll
    public void setup() throws Exception {
        String token = jwtService.generateToken("admin");
        tokenCookie = new Cookie("token", token);

        // 1. Add qualification
        Map<String, Object> qualification = new HashMap<>();
        qualification.put("qualification", "GCSE");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(qualification))
                .cookie(tokenCookie));

        // 2. Add subject
        Map<String, Object> subject = new HashMap<>();
        subject.put("name", "Maths");
        subject.put("qualification", "GCSE");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(subject))
                .cookie(tokenCookie));

        // 3. Add topic
        Map<String, Object> topic = new HashMap<>();
        topic.put("name", "Algebra");
        topic.put("subject", "Maths");
        topic.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(topic))
                .cookie(tokenCookie)).andReturn();

        Map<String, Object> question = new HashMap<>();
        question.put("question", "What is 2 + 2?");
        question.put("answer", "4");
        question.put("marks", 1);
        question.put("topic", "Algebra");
        question.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/questions/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Question added"));
    }

    @Test
    public void addQuestionNoTopic() throws Exception {
        Map<String, Object> question = new HashMap<>();
        question.put("question", "What is 2 + 2?");
        question.put("answer", "4");
        question.put("marks", 1);
        question.put("topic", "nope");
        question.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/questions/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Topic not found"));
    }

    @Test
    public void subListQuestions() throws Exception {
        for (int i = 0; i < 15; i++) {
            Map<String, Object> question = new HashMap<>();
            question.put("question", "What is %d + %d?".formatted(i, i));
            question.put("answer", "%d".formatted(i + i));
            question.put("marks", 1);
            question.put("topic", "Algebra");
            question.put("qualification", "GCSE");

            mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/questions/add")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(question))
                            .cookie(tokenCookie))
                    .andExpect(status().isOk());
        }

        mockMvc.perform(MockMvcRequestBuilders.get("/api/question/get?topicId=1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questions.length()").value(10));
    }

    @Test
    public void getQuestions() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/questions/get")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk());
    }

    @Test
    public void editQuestions() throws Exception {
        Map<String, Object> question = new HashMap<>();
        question.put("id", 1);
        question.put("question", "What is 10 + 10?");
        question.put("answer", 20);
        question.put("marks", 1);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/questions/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Question edited"));

        question.put("id", 10);
        question.put("question", "What is 10 + 10?");
        question.put("answer", 20);
        question.put("marks", 1);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/questions/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No value present"));
    }

    @Test
    public void deleteQuestion() throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", 1);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/questions/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Question Deleted Successfully"));

        payload.put("id", 10);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/questions/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Failed To Delete Question"));

    }

}
