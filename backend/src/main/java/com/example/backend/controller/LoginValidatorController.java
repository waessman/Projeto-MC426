package com.example.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.LoginValidatorService;
import com.example.backend.vo.LoginRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Login Validator Controller")
@CrossOrigin(origins = {"http://localhost:8080"})
@Controller
public class LoginValidatorController {

    private static final Logger logger = LoggerFactory.getLogger(LoginValidatorController.class);

    private final LoginValidatorService service;

    public LoginValidatorController(final LoginValidatorService service){
      this.service = service;
    }

    @Operation(summary = "Login Validator", description = "Validate login request")
    @GetMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = { @ApiResponse(responseCode = "400", description = "Bad Request Error") })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createClient(@RequestBody final LoginRequest request){
        logger.debug("Start login validation");

        service.validateLogin(request);

        logger.debug("End login validation");

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
