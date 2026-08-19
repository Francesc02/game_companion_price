package com.example.Ripasso.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RipassoRepository {
    private final JdbcTemplate jdbcTemplate;

    public RipassoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getUsers() {
        String sql = "SELECT username, password FROM users";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Map<String, Object> user = new HashMap<>();
            user.put("username", rs.getString("username"));
            user.put("password", rs.getString("password"));
            return user;
        });
    }

    public void insertUser(String username, String password) {
        jdbcTemplate.update(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                username,
                password
        );
    }
}
