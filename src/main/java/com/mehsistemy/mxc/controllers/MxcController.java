package com.mehsistemy.mxc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MxcController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("index", "mxc21");
        return "index";
    }

    @GetMapping("/portfolio")
    public String portfolio(Model model) {
        model.addAttribute("portfolio", "Каталог");
        return "portfolio";
    }

    // --- Новые API для загрузки контента через AJAX ---
    @GetMapping("/api/home-content")
    public String getHomeContent() {
        return "fragments/home :: content"; // Использует Thymeleaf Fragment для главной страницы
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

    // Этот метод перехватывает прямые запросы на /services, /portfolio и т.д. И возвращает базовый index.html, а JS уже загрузит нужный фрагмент.
    @GetMapping({"/contact"})
    public String forwardRoutes() {
        return "index";
    }
}
