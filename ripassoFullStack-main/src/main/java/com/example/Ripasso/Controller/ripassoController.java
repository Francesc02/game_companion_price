package com.example.Ripasso.Controller;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ripasso.User;
import com.example.Ripasso.Service.RipassoService;

@RestController
@RequestMapping("api/")
public class RipassoController {
	
	@Autowired 
	private RipassoService ripassoService;
	
	private static final Logger logger = LoggerFactory.getLogger(RipassoController.class);

	
	
	@GetMapping("error")
	public String error() {
		
		return "sei andato in errore e non c'è nulla da vedere qui";
		
	}
	@GetMapping("get")
	public List<Map<String,Object>> ricezioneDalFe() {
        logger.info("Sono dentro il controller");
        
        // Recupera la lista di username dal servizio e la ritorna
        List<Map<String,Object>> usernames = ripassoService.getUsers();
        return usernames;
    }
	
	@PostMapping("insertUser")
	public  String insertUser(@RequestBody User user) {
		
		this.ripassoService.insertUser(user.getUsername(), user.getPassword());
		logger.info("questi sono i dati: "+ user.getUsername() + " password: " + user.getPassword());
		return "User added successfully!";
	}
	
	@PostMapping("login")
	public boolean Login(@RequestBody User user) {
	boolean risposta=this.ripassoService.matchUserLogin(user.getUsername(),user.getPassword());
	return risposta;
	
	}
	
	
	
	
	
	

}
