package com.example.backend.service;

import com.example.backend.vo.LoginRequest;

public interface LoginValidatorService {

    void validateLogin(final LoginRequest request);
}
