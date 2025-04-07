package danyal.fyp.awd.api.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.api.controller.UserControllerTest;
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
public class AdminDashboard {
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
    }

    @Test
    public void loadDashboard() throws Exception {
        addUserAttempt(); // To test the admin dashboard fully - and how it processes user attempts. The dedicated test may or may not run before this one.

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/dashboard")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("dashboard").exists())
                .andExpect(jsonPath("logs").exists());
    }

    private void addUserAttempt() throws Exception {
        payload = new HashMap<>();
        payload.put("marks", 1);
        payload.put("topicId", 1);
        payload.put("proportion", 100.0);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/save-marks")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload))
                .cookie(tokenCookie));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/profile")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload))
                .cookie(tokenCookie));
    }
}
