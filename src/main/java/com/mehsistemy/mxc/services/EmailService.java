package com.mehsistemy.mxc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // Внедрение mailSender через конструктор (рекомендуется Spring Boot)
    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactFormEmail(String fromEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("juraev.cj@list.ru"); // Email отправителя (который настроен в application.properties)
        message.setTo("juraev.cj@list.ru"); // !!! ВАШ АДРЕС ПОЧТЫ, КУДА ДОЛЖНЫ ПРИХОДИТЬ ЗАЯВКИ !!!
        message.setSubject(subject);
        message.setText(body);
        String fullBody = "Отправитель: " + fromEmail + "\n\n" + body;
        message.setText(fullBody);
        message.setReplyTo(fromEmail);

        mailSender.send(message);
    }

    public void sendOrderEmail(String productName, String userName, String userPhone) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("juraev.cj@list.ru");
        message.setTo("juraev.cj@list.ru");

        // Формируем четкую тему письма для менеджера
        message.setSubject("!!! НОВЫЙ ЗАКАЗ: " + productName);

        // Формируем структурированный текст заказа
        String orderBody = String.format(
                "Заявка на покупку оборудования\n" +
                        "----------------------------\n" +
                        "Устройство: %s\n" +
                        "Имя клиента: %s\n" +
                        "Телефон: %s\n" +
                        "----------------------------\n" +
                        "Тип заявки: Pop-up из Портфолио",
                productName, userName, userPhone
        );

        message.setText(orderBody);
        mailSender.send(message);
    }
}
