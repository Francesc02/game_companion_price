package com.example.Ripasso.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.Ripasso.Service.RipassoService;

@Repository
public class RipassoRepository {
	private final JdbcTemplate jdbcTemplate;
	private static final Logger logger = LoggerFactory.getLogger(RipassoService.class);

	@Autowired
	public RipassoRepository(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public List<Map<String, Object>> getUsers() {
//    	logger.info("sono dentro il service");
//        String sql = "SELECT * FROM users"; 
//        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("username")); per ottenere solo un risultato
		String sql = "SELECT username, password FROM users";
		List<Map<String, Object>> users = jdbcTemplate.query(sql, (rs, rowNum) -> {
			Map<String, Object> user = new HashMap<>();
			user.put("username", rs.getString("username"));
			user.put("password", rs.getString("password"));
			return user;
		});

		return users;

	}

	// Metodo per inserire un nuovo utente
	public void insertUser(String username, String password) {
		// Query SQL per inserire un nuovo utente
		String sql = "INSERT INTO users (username, password) VALUES (?, ?)";

		// Esegui l'inserimento nel database con i parametri forniti
		jdbcTemplate.update(sql, username, password);
	}

}
