package com.example.backend;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.backend.service.LoginValidatorServiceImpl;
import com.example.backend.vo.LoginRequest;

@ExtendWith(MockitoExtension.class)
public class LoginValidatorServiceTest {

    @InjectMocks
    private LoginValidatorServiceImpl service;

    @Test
    public void validateLoginValidatorServiceSuccess(){
        final LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("12345");
        service.validateLogin(request);
    }

    @org.junit.Test(expected = RuntimeException.class)
    public void validateLoginValidatorServiceInvalidRequest(){
        final LoginRequest request = new LoginRequest();
        request.setUsername("adin");
        request.setPassword("12345");
        try {
            service.validateLogin(request);
        }  catch (RuntimeException ex){
            assertThat(ex.getMessage().equals("error during validation"));
            throw ex;
        }
    }
}
