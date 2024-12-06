package danyal.fyp.awd.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.service.user.JwtService;
import jakarta.servlet.http.Cookie;
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

import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
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
                .andExpect(jsonPath("email").value("test@test.com"));
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
}
