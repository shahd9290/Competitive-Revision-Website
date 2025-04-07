package danyal.fyp.awd.api.controller;

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
        token = jwtService.generateToken("admin");
        tokenCookie = new Cookie("token", token);
    }

    @Test
    public void addQualificationThenCheckDuplicate() throws Exception {
        payload = new HashMap<>();
        payload.put("qualification", "GCSEs");

        // Add qualification
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Qualification Added Successfully"));

        // Try duplicate
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Already Exists."));
    }

    @Test
    public void addSubjectWithAndWithoutQualification() throws Exception {
        // No qualification yet
        payload = new HashMap<>();
        payload.put("name", "Mathematics");
        payload.put("qualification", "GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Does Not Exist"));

        // Add qualification
        payload = new HashMap<>();
        payload.put("qualification", "GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk());

        // Add subject again
        payload.put("name", "Mathematics");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Created new subject"));

        // Try adding again to trigger duplicate
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subject already exists with this qualification!"));
    }

    @Test
    public void addSubjectWithMultipleQualifications() throws Exception {
        // Add first qualification
        payload = new HashMap<>();
        payload.put("qualification", "GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk());

        // Add subject
        payload.put("name", "Mathematics");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk());

        // Add new qualification
        payload = new HashMap<>();
        payload.put("qualification", "A-Levels");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk());

        // Add subject with new qualification
        payload.put("name", "Mathematics");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Updated Existing Subject with new qualification"));
    }

    @Test
    public void getAllSubjectsQualifiedAndUnqualified() throws Exception {
        // Add qualification & subject
        payload = new HashMap<>();
        payload.put("qualification", "GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk());

        payload.put("name", "Mathematics");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/subjects/add")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk());

        // Get all subjects (no filter)
        mockMvc.perform(MockMvcRequestBuilders.get("/api/subject/get-all")
                        .header("Authorization", "Bearer " + token)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").exists());

        // Get subjects by valid qualification
        mockMvc.perform(MockMvcRequestBuilders.get("/api/subject/get-all?qualification=GCSEs")
                        .header("Authorization", "Bearer " + token)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Mathematics"));

        // Invalid qualification should 400
        mockMvc.perform(MockMvcRequestBuilders.get("/api/subject/get-all?qualification=Bachelors")
                        .header("Authorization", "Bearer " + token)
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Qualification Does Not Exist"));
    }
}
