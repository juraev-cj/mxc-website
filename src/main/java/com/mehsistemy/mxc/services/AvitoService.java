package com.mehsistemy.mxc.services;

import com.mehsistemy.mxc.model.AvitoReview;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;


@Service
public class AvitoService {
    @Value("${avito.client-id}")
    private String clientId;

    @Value("${avito.client-secret}")
    private String clientSecret;

    private String accessToken;

    // Метод для получения токена
    public void updateToken() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.avito.ru/token";

            // Подготовка данных для запроса (формат x-www-form-urlencoded)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            String body = "grant_type=client_credentials" +
                    "&client_id=" + clientId.trim() +
                    "&client_secret=" + clientSecret.trim() + "&scope=ratings:read";

            HttpEntity<String> entity = new HttpEntity<>(body, headers);

            // Отправляем POST запрос
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                this.accessToken = (String) response.getBody().get("access_token");
                System.out.println("Токен успешно получен!");
            }
        } catch(Exception e) {
            System.err.println("Ошибка при получении токена: " + e.getMessage());
        }
    }

    @Cacheable("avito_reviews")
    public List<AvitoReview> getReviews() {
        // 1. Проверяем наличие токена перед запросом
        if (accessToken == null) {
            updateToken();
        }

        RestTemplate restTemplate = new RestTemplate();
        // 2. Указываем точный URL для получения отзывов (актуально для API v1)
        String url = "https://api.avito.ru/ratings/v1/reviews?user_id=362681198&limit=10&offset=0";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            // 3. Авито не возвращает список [ ] сразу. Он возвращает объект { "reviews": [ ] }
            // Поэтому получаем ответ как Map
            ResponseEntity<Map> response = restTemplate.exchange(
                    url, HttpMethod.GET, entity, Map.class
            );

            Map<String, Object> body = response.getBody();
            List<AvitoReview> resultList = new ArrayList<>();

            if (body != null && body.containsKey("reviews")) {
                List<Map<String, Object>> reviewsData = (List<Map<String, Object>>) body.get("reviews");

                // 4. Проходим по списку и превращаем данные Авито в ваши объекты AvitoReview
                for (Map<String, Object> item : reviewsData) {
                    // 1. Имя автора
                    String name = "Клиент Авито";
                    if (item.get("sender") instanceof Map) {
                        Map<String, Object> senderMap = (Map<String, Object>) item.get("sender");
                        name = senderMap.getOrDefault("name", "Клиент Авито").toString();
                    }

                    // 2. Текст и оценка (ПЕРЕНЕСЛИ ВВЕРХ, чтобы переменные создались до использования)
                    String text = (String) item.getOrDefault("text", "Текст отзыва отсутствует");
                    Object scoreObj = item.get("score");
                    int score = (scoreObj instanceof Number) ? ((Number) scoreObj).intValue() : 5;

                    // 3. Дата
                    Object rawObject = item.get("createdAt");
                    String formattedDate = "Недавно";
                    if (rawObject != null) {
                        try {
                            long timestamp;
                            if (rawObject instanceof Number) {
                                timestamp = ((Number) rawObject).longValue();
                            } else {
                                timestamp = Long.parseLong(rawObject.toString());
                            }
                            if (timestamp > 9999999999L) {
                                timestamp = timestamp / 1000;
                            }
                            java.time.Instant instant = java.time.Instant.ofEpochSecond(timestamp);
                            java.time.ZonedDateTime dateTime = instant.atZone(java.time.ZoneId.systemDefault());
                            formattedDate = dateTime.format(java.time.format.DateTimeFormatter.ofPattern("dd.MM.yyyy"));
                        } catch (Exception e) {
                            String s = rawObject.toString();
                            formattedDate = s.length() >= 10 ? s.substring(0, 10) : s;
                        }
                    }

                    // 4. ТЕПЕРЬ добавляем в список (все переменные name, text, score, formattedDate уже готовы)
                    resultList.add(new AvitoReview(name, text, score, formattedDate));

                    if (resultList.size() >= 10) break;
                }

                // Это сообщение лучше вынести ЗА цикл, чтобы оно не спамило 10 раз
                if (!reviewsData.isEmpty()) {
                    System.out.println("Ключи первого отзыва: " + reviewsData.get(0).keySet());
                }
            }
            System.out.println("Получено отзывов от Авито: " + resultList.size());
            return resultList;

        } catch (Exception e) {
            // Если токен протух, обнуляем его, чтобы при следующем заходе он обновился
            System.err.println("Детальная ошибка Авито: " + e.getMessage());
            accessToken = null;
            return Collections.emptyList();
        }
    }

    @Scheduled(fixedRate = 86400000) // 24 часа
    @CacheEvict(value = "avito_reviews", allEntries = true)
    public void clearCache() {
        // Аннотация @CacheEvict сама очистит кэш
        System.out.println("Кэш отзывов Авито очищен");
    }
}
