package com.example.backend.service;

import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.vo.LoginRequest;

@Service
public class LoginValidatorServiceImpl implements LoginValidatorService{

    private static final Logger logger = LoggerFactory.getLogger(LoginValidatorServiceImpl.class);

    @Autowired
    public LoginValidatorServiceImpl(){
        // default constructor
    }

    @Override
    public void validateLogin(final LoginRequest request){
        logger.debug("Start service validateLogin()");

        if ((Objects.equals(request.getUsername(), "admin")) && (Objects.equals(request.getPassword(), "12345"))){
            logger.debug("End service validateLogin()");
        } else {
            throw new RuntimeException("error during validation");
        }
    }

}
