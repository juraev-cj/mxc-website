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

    @GetMapping("/index")
    public String home(Model model) {
        model.addAttribute("index", "МХС - Главная");
        return "index";
    }

    @GetMapping("/services")
    public String services(Model model) {
        model.addAttribute("services", "МХС - Услуги");
        return "services";
    }

    @GetMapping("/portfolio")
    public String portfolio(Model model) {
        model.addAttribute("portfolio", "МХС - Портфолио");
        return "portfolio";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("contact", "МХС - Контакты");
        return "contact";
    }

    @GetMapping("/thanks")
    public String thanks(Model model) {
        model.addAttribute("thanks", "МХС - Спасибо");
        return "thanks";
    }
}
