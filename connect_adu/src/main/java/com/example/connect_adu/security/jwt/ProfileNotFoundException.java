package com.example.connect_adu.security.jwt;

public class ProfileNotFoundException extends RuntimeException {
    // Otomatik olarak oluşturulan bir seri numara
    private static final long serialVersionUID = 1L;

    public ProfileNotFoundException() {
        super();
    }

    public ProfileNotFoundException(String message) {
        super(message);
    }

    public ProfileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
