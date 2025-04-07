package danyal.fyp.awd.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.service.user.JwtService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.*;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TopicTest {

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
        payload.put("name", "Mathematics");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie));
    }

    @Test
    public void addTopicOne() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("name", "Binomials");
        payload.put("subject", "Mathematics");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Topic saved successfully"));
    }

    @Test
    public void addTopicTwo() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("name", "Binomials");
        payload.put("subject", "English");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subject Does Not Exist"));
    }

    @Test
    public void addTopicThree() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("name", "Binomials");
        payload.put("subject", "Mathematics");
        payload.put("qualification", "Bachelors");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/topics/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Does Not Exist"));
    }

    @Test
    @AfterAll // Last test to run
    public void getAllTopics() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/topic/get-all?qualification=GCSE&subject=Mathematics")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Binomials"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/topic/get-all?qualification=Bachelors&subject=Mathematics")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Does Not Exist"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/topic/get-all?qualification=GCSE&subject=Physics")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subject Does Not Exist"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/topic/get-all")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Binomials"));
    }
}
