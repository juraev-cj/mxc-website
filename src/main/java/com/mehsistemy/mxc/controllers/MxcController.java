package com.mehsistemy.mxc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MxcController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("index", "МХС - Главная");
        return "index";
    }

    // --- Новые API для загрузки контента через AJAX ---

    @GetMapping("/api/home-content")
    public String getHomeContent() {
        return "fragments/home :: content"; // Использует Thymeleaf Fragment для главной страницы
    }

    @GetMapping("/api/services-content")
    public String getServicesContent() {
        return "fragments/services :: content"; // Использует Thymeleaf Fragment для услуг
    }

    @GetMapping("/api/portfolio-content")
    public String getPortfolioContent() {
        return "fragments/portfolio :: content"; // Использует Thymeleaf Fragment для услуг
    }

    @GetMapping("/api/contact-content")
    public String getContactContent() {
        return "fragments/contact :: content"; // Использует Thymeleaf Fragment для услуг
    }

    @GetMapping("/thanks")
    public String thanks(Model model) {
        model.addAttribute("thanks", "МХС - Спасибо");
        return "thanks";
    }
}
