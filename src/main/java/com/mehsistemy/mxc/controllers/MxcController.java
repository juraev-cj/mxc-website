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

    @GetMapping("/dissolvers")
    public String dissolvers(Model model) {
        model.addAttribute("dissolvers", "Диссольверы");
        return "catalog/dissolvers";
    }

    @GetMapping("/tm")
    public String tm(Model model) {
        model.addAttribute("tm", "Тихоходная мешалка");
        return "catalog/tm";
    }

    @GetMapping("/rsm")
    public String rsm(Model model) {
        model.addAttribute("rsm", "Реактор с мешалкой");
        return "catalog/rsm";
    }

    @GetMapping("/sgb")
    public String sgb(Model model) {
        model.addAttribute("sgb", "Галтовочный барабан");
        return "catalog/sgb";
    }

    @GetMapping("/stpb")
    public String stpb(Model model) {
        model.addAttribute("stpb", "Пьяная бочка");
        return "catalog/stpb";
    }

    @GetMapping("/sspl")
    public String sspl(Model model) {
        model.addAttribute("sspl", "Сварочный стол");
        return "catalog/sspl";
    }

    // --- Новые API для загрузки контента через AJAX ---

    @GetMapping("/api/home-content")
    public String getHomeContent() {
        return "fragments/home :: content"; // Использует Thymeleaf Fragment для главной страницы
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

    // Этот метод перехватывает прямые запросы на /services, /portfolio и т.д. И возвращает базовый index.html, а JS уже загрузит нужный фрагмент.
    @GetMapping({"/portfolio", "/contact"})
    public String forwardRoutes() {
        return "index";
    }
}
