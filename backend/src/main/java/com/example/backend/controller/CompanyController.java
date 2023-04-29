package com.example.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.CompanyService;
import com.example.backend.vo.CompanyCreationRequest;
import com.example.backend.vo.CompanyResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = {"http://localhost:8080"})
@Tag(name = "Company Controller")
@Controller
public class CompanyController {

    private static final Logger logger = LoggerFactory.getLogger(CompanyController.class);

    private final CompanyService service;

    public CompanyController(final CompanyService service){
      this.service = service;
    }

    @Operation(summary = "company creation", description = "Creates a new company")
    @PostMapping(path = "/company", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = { @ApiResponse(responseCode = "400", description = "Bad Request Error") })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createCompany(@RequestBody final CompanyCreationRequest request){
      logger.debug("Creating a new client");

      CompanyResponse response = service.createCompany(request);

      return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Retrieve company by id", description = "Retrieve company by id")
    @GetMapping(path = "/company", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = { @ApiResponse(responseCode = "400", description = "Bad Request Error") })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CompanyResponse> getClient(@Parameter(description = "companyId") @RequestParam(value = "companyId", required = false) final String id){
      logger.debug("Retrieving a company");

      CompanyResponse response = service.getCompanyById(id);

      logger.debug("Retrieving a company with 200");

      return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
