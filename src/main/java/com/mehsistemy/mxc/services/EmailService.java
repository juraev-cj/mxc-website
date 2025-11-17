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
}
