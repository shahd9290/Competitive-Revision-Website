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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
public class AdminQualificationTest {
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
    public void getQualifications() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/qualifications/get")
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteQualifications() throws Exception {
        payload = new HashMap<>();
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/qualifications/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Qualification Deleted Successfully"));

        payload.put("qualification", "GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/qualifications/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Failed To Delete Qualification"));
    }

    @Test
    public void editQualifications() throws Exception {
        payload = new HashMap<>();
        payload.put("id", 1);
        payload.put("qualification", "GCSEs");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("Qualification Edited Successfully"));

        payload.put("id", 10);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/qualifications/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest());
    }
}
