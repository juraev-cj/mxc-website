package com.mehsistemy.mxc.controllers;

import com.mehsistemy.mxc.model.AvitoReview;
import com.mehsistemy.mxc.services.AvitoService;
import com.mehsistemy.mxc.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/api/advantages-content")
    public String getAdvantagesContent() {
        return "fragments/advantages :: content"; // Использует Thymeleaf Fragment для главной страницы
    }

    @GetMapping("/api/chain-content")
    public String getChainContent() {
        return "fragments/chain :: content"; // Использует Thymeleaf Fragment для главной страницы
    }


    @Autowired
    private AvitoService avitoService;
    @GetMapping("/api/reviews-content")
    public String getReviewsContent(Model model) {
        List<AvitoReview> reviews = avitoService.getReviews();

        if (reviews == null || reviews.isEmpty()) {
            reviews = new ArrayList<>();
            reviews.add(new AvitoReview("Тестовый Автор", "API Авито пока не отдало данные, но заглушка работает!", 5, "2026-01-22"));
        }

        model.addAttribute("avitoReviews", reviews);
        return "fragments/reviews :: content";
    }

    @GetMapping("/api/contact-content")
    public String getContactContent() {
        return "contact :: content"; // Использует Thymeleaf Fragment для услуг
    }

    @GetMapping("/thanks")
    public String thanks(Model model) {
        model.addAttribute("thanks", "МХС - Спасибо");
        return "thanks";
    }

    @GetMapping("/privacy")
    public String privacyPolicy(Model model) {
        model.addAttribute("title", "Политика конфиденциальности | МХС");
        return "privacy";
    }

    // Этот метод перехватывает прямые запросы на /contact И возвращает базовый index.html, а JS уже загрузит нужный фрагмент.
    @GetMapping({"/contact"})
    public String forwardRoutes() {
        return "index";
    }

    private final EmailService emailService;

    @Autowired
    public MxcController(EmailService emailService) {
        this.emailService = emailService;
    }
    @PostMapping("/api/send-order")
    public ResponseEntity<?> handleOrder(@RequestParam("productName") String productName,
                                         @RequestParam("userName") String userName,
                                         @RequestParam("userName") String userCity,
                                         @RequestParam("userPhone") String userPhone) {
        try {
            emailService.sendOrderEmail(productName, userName, userPhone);
            // Здесь ваша логика: отправка письма, запись в БД и т.д.
            System.out.println("Заказ принят: " + productName + " от " + userName);

            // Возвращаем статус 200 OK
            return ResponseEntity.ok().body(Map.of("status", "success"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ошибка на сервере");
        }
    }
}
