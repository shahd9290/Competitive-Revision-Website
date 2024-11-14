package danyal.fyp.awd.api.controller;

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

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SubjectQualificationTest {

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
    public void addQualification() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("qualification","GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/qualification/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Qualification Added Successfully"));

    }

    @Test
    public void addSubjectNew() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("name", "Mathematics");
        payload.put("qualification","GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/subject/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Created new subject"));

        // Test it can't be added again
        mockMvc.perform(MockMvcRequestBuilders.post("/api/subject/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subject already exists with this qualification!"));


    }


    @Test
    public void addSubjectNoQual() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("name", "Mathematics");
        payload.put("qualification","A-Levels");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/subject/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Does Not Exist."));

    }

    @Test
    public void addSubjectNewQual() throws Exception {
        tokenCookie = new Cookie("token", token);

        payload = new HashMap<>();
        payload.put("qualification","A-Levels");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/qualification/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Qualification Added Successfully"));

        payload.put("name", "Mathematics");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/subject/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Updated Existing Subject with new qualification"));

    }





}
