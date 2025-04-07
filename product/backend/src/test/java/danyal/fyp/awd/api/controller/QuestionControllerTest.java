package danyal.fyp.awd.api.controller;

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
public class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ObjectMapper objectMapper;

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
    public void testGetQuestionByTopic() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/question/get?topicId=1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questions").exists());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/question/get?topicId=2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Topic does not exist"));

        Map<String, Object> topic = new HashMap<>();
        topic.put("name", "Arithmetic");
        topic.put("subject", "Maths");
        topic.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(topic))
                .cookie(tokenCookie)).andReturn();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/question/get?topicId=2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No Questions for this topic!"));

    }
}

