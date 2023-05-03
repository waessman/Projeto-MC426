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

import com.example.backend.service.ClientService;
import com.example.backend.service.ClientServiceImpl;
import com.example.backend.vo.ClientCreationRequest;
import com.example.backend.vo.ClientResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Client Controller")
@CrossOrigin(origins = {"http://localhost:8080"})
@Controller
public class ClientController {

    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    private final ClientService service;

    public ClientController(final ClientServiceImpl service){
        this.service = service;
    }

    @Operation(summary = "Client creation", description = "Creates a new client")
    @PostMapping(path = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = { @ApiResponse(responseCode = "400", description = "Bad Request Error") })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createClient(@RequestBody final ClientCreationRequest request){
        logger.debug("Creating a new client");

        ClientResponse response = service.createClient(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Retrieve Client by id", description = "Retrieve client by id")
    @GetMapping(path = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = { @ApiResponse(responseCode = "400", description = "Bad Request Error") })
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ClientResponse> getClient(@Parameter(description = "userId") @RequestParam(value = "userId", required = false) final String id){
        logger.debug("Retrieving a client");

        ClientResponse response = service.getClientById(id);

        logger.debug("Retrieving a client with 200");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
