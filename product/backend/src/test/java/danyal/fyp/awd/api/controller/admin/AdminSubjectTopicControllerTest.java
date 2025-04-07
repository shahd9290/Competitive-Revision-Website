package danyal.fyp.awd.api.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.service.user.JwtService;
import jakarta.servlet.http.Cookie;
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
public class AdminSubjectTopicControllerTest {

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
        token = jwtService.generateToken("admin");

        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("name", "Chemistry");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie));

        payload = new HashMap<>();
        payload.put("name", "Physics");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie));

        payload = new HashMap<>();
        payload.put("name", "Elements");
        payload.put("subject", "Chemistry");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie));
    }

    @Test
    public void getSubjects() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/subjects/get")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").exists());
    }

    @Test
    public void deleteSubject() throws Exception {
        payload = new HashMap<>();
        payload.put("id", 3);
        payload.put("qualification", "GCSE");
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/subjects/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Subject Deleted Successfully"));

        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("qualification", "GCSE");
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/subjects/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Subject Deleted Successfully"));

         payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("qualification", "nope");
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/subjects/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Failed To Delete Subject"));
    }

    @Test
    public void editSubject() throws Exception {
        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("subject", "Maths");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isOk())
            .andExpect(content().string("Subject Edited Successfully"));

        payload = new HashMap<>();
        payload.put("id", 12);
        payload.put("subject", "Maths");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Failed To Edit Subject"));

        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("subject", "Maths");
        payload.put("qualification", "");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isOk())
            .andExpect(content().string("Subject Edited Successfully"));
    }

    @Test
    public void getTopics() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/topics/get")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").exists());
    }

    @Test
    public void deleteTopics() throws Exception {
        payload = new HashMap<>();
        payload.put("id", 1);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/topics/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Topic Deleted Successfully"));

        payload = new HashMap<>();
        payload.put("id", 18);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/topics/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Failed To Delete Topic"));
    }

    @Test
    public void editTopic() throws Exception {
        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("topic", "Trigonometry");
        payload.put("subject", "Mathematics");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isOk())
            .andExpect(content().string("Topic Edited Successfully"));

        payload = new HashMap<>();
        payload.put("id", 12);
        payload.put("topic", "Trigonometry");
        payload.put("subject", "Mathematics");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Failed To Edit Topic"));

        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("topic", "Trigonometry");
        payload.put("subject", "Mathematics");
        payload.put("qualification", "");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isOk())
            .andExpect(content().string("Topic Edited Successfully"));

        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("topic", "Trigonometry");
        payload.put("subject", "");
        payload.put("qualification", "");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/edit")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(payload))
                    .cookie(tokenCookie))
            .andExpect(status().isOk())
            .andExpect(content().string("Topic Edited Successfully"));
    }
}
