package com.mehsistemy.mxc.controllers;

import com.mehsistemy.mxc.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ContactController {

    private final EmailService emailService; // Внедряем сервис

    @Autowired
    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact-submit")
    public String submitForm(@RequestParam String name, @RequestParam String email, @RequestParam String message) {

        String subject = "Новая заявка от " + name;
        // Передаем данные из формы в метод сервиса
        emailService.sendContactFormEmail(email, subject, message);

        // Перенаправляем пользователя на страницу "Спасибо"
        return "redirect:/thanks.html";
    }
}
