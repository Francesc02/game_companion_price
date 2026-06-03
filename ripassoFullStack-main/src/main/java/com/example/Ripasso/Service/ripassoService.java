package com.example.Ripasso.Service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Ripasso.Repository.RipassoRepository;

@Service
public class RipassoService {

	private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private RipassoRepository ripassoRepository;

	private static final Logger logger = LoggerFactory.getLogger(RipassoService.class);

	// Costruttore con Dependency Injection
	@Autowired

	public List<Map<String, Object>> getUsers() {
		logger.info("sono dentro il service");

		return this.ripassoRepository.getUsers();

	}

	public void insertUser(String username, String password) {

		String passwordCrypted = this.cryptaPassword(password);

		this.ripassoRepository.insertUser(username, passwordCrypted);
	}

	public Boolean matchUserLogin(String username, String password) {
		List<Map<String, Object>> users = this.ripassoRepository.getUsers();

		for (Map<String, Object> user : users) {
			String dbUsername = (String) user.get("username");
			String dbPassword = (String) user.get("password"); // Password criptata salvata nel DB

			if (dbUsername.equals(username)) { // Se l'username è giusto, controlla la password
				if (passwordEncoder.matches(password, dbPassword)) { // Confronto BCrypt
					logger.info("Login riuscito per l'utente: " + username);
					return true;
				} else {
					logger.info("Password errata per l'utente: " + username);
				}
			}
		}
		logger.info("Nessun utente trovato con username: " + username);
		return false;

	}

	public String cryptaPassword(String password) {
		String passwordCrypted = passwordEncoder.encode(password);
		logger.info("password criptata: " + passwordCrypted);
		return passwordCrypted;
	}

}
//public void intermezzoBE(String query) {
//	
//	logger.info("sono dentro il service");
//	 
//	this.ripassoRepository.insertQuery(query);
//	
//}