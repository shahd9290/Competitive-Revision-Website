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

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
public class AdminUserTest {
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
    public void getUsers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/users/get")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("[0].id").exists())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    public void deleteUser() throws Exception {
        payload = new HashMap<>();
        payload.put("id", "9e16c6e7-3ca8-459d-8bd6-d3f9267510a2");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/users/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("User Deleted Successfully"));

        payload = new HashMap<>();
        payload.put("id", "9e16t6e7-3ca8-459d-8bd6-d3f9267510a2");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/users/delete")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void editUser() throws Exception {
        payload = new HashMap<>();
        payload.put("id", "9e16c6e7-3ca8-459d-8bd6-d3f9267510a2");
        payload.put("username", "newname");
        payload.put("email", "newemail@email.com");
        payload.put("password", "newpassword");
        payload.put("role", "ROLE_ADMIN");
        payload.put("qualification", "GCSE");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/users/edit")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("User Edited Successfully"));

        payload = new HashMap<>();
        payload.put("id", "9e16c6e7-3ca8-459d-8bd6-d3f9267510a2");
        payload.put("username", "user");
        payload.put("email", "test@test.com");
        payload.put("role", "ROLE_ADMIN");
        payload.put("qualification", "");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/users/edit")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Failed To Edit User"));

        payload = new HashMap<>();
        payload.put("id", "9e16c6e7-3ca8-459d-8bd6-d3f9267510a2");
        payload.put("username", "newname");
        payload.put("email", "newemail@email.com");
        payload.put("password", "");
        payload.put("role", "ROLE_USER");
        payload.put("qualification", "");
        setup();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/users/edit")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
                        .cookie(tokenCookie))
                .andExpect(status().isOk())
                .andExpect(content().string("User Edited Successfully"));
    }
}
