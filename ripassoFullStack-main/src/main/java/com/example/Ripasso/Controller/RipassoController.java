package com.example.Ripasso.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ripassoController {
    @GetMapping("error")
    public String error() {
        return "sei andato in errore e non c'è nulla da vedere qui";
    }
}
