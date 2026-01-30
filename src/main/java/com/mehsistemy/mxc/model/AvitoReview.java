package com.mehsistemy.mxc.model;


public class AvitoReview {
    private String authorName;
    private String text;
    private int score;
    private String date;

    public AvitoReview() {
    }

    public AvitoReview(String authorName, String text, int score, String date) {
        this.authorName = authorName;
        this.text = text;
        this.score = score;
        this.date = date;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getText() {
        return text;
    }

    public int getScore() {
        return score;
    }

    public String getDate() {
        return date;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
