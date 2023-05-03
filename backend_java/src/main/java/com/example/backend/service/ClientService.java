package com.example.backend.service;

import com.example.backend.vo.ClientCreationRequest;
import com.example.backend.vo.ClientResponse;

public interface ClientService {

    ClientResponse createClient(final ClientCreationRequest request);

    ClientResponse getClientById(final String id);
}
