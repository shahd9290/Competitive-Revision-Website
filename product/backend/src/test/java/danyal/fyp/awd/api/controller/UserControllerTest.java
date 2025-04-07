package danyal.fyp.awd.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.service.user.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
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
public class UserControllerTest {

    private Map<String, Object> payload;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ObjectMapper objectMapper;
    private String token;
    private Cookie tokenCookie;

    @BeforeEach
    public void generateToken() {
        token = jwtService.generateToken("user");
    }

    @Test
    public void getProfile() throws Exception {
        tokenCookie = new Cookie("token", token);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/profile")
                .header("Authorization","Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload))
                .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("username").value("user"))
                .andExpect(jsonPath("marks").value(0))
                .andExpect(jsonPath("attempts").exists());
    }

    @Test
    public void getQualification() throws Exception {
        tokenCookie = new Cookie("token", token);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/get-qualification")
                        .header("Authorization","Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("name").value("GCSE"));
    }

    @Test
    public void updateMarks() throws Exception {
        payload = new HashMap<>();
        payload.put("marks",1);
        payload.put("topicId",1);
        payload.put("proportion",100.0);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/save-marks")
                .header("Authorization","Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload))
                .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }
}
