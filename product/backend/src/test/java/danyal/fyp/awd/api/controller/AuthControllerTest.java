package danyal.fyp.awd.api.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import danyal.fyp.awd.service.user.JwtService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeAll;
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
public class AuthControllerTest {

    private Map<String, Object> payload;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ObjectMapper objectMapper;
    private String token;

    @BeforeEach
    public void generateToken() {
        token = jwtService.generateToken("user");
    }

    @Test
    public void loginSuccess() throws Exception {
        payload = new HashMap<>();
        payload.put("username", "user");
        payload.put("password", "password");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(content().string("User logged in successfully"));
    }

    @Test
    public void loginFail() throws Exception {
        payload = new HashMap<>();
        payload.put("username", "user");
        payload.put("password", "incorrect");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Username or password is incorrect."));
    }

    @Test
    public void refreshTokenSuccess() throws Exception {
        Cookie tokenCookie = new Cookie("token", token);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/refresh/refresh-token")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.tokenExpiry").exists())
                .andExpect(jsonPath("$.token").isString())
                .andExpect(jsonPath("$.tokenExpiry").isString());
    }

    @Test
    public void registerSuccess() throws Exception {
        payload = new HashMap<>();
        payload.put("username", "test");
        payload.put("password", "test");
        payload.put("email", "testing@test.com");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("test"))
                .andExpect(jsonPath("$.email").value("testing@test.com"));
    }

    @Test
    public void registerFailOne() throws Exception {
        payload = new HashMap<>();
        payload.put("username", "user");
        payload.put("password", "test");
        payload.put("email", "testing@test.com");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Username or Email already exists"));

    }

    @Test
    public void registerFailTwo() throws Exception {
        payload = new HashMap<>();
        payload.put("username", "test2");
        payload.put("password", "test");
        payload.put("email", "testing1@test.com");
        payload.put("qualification", "A-Levels");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Does Not Exist"));
    }

}
