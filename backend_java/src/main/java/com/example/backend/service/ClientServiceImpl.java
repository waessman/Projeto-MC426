package com.example.backend.service;

import static com.example.backend.helper.EntityConversionHelper.convertClientEntityToClientResponse;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.domain.ClientEntity;
import com.example.backend.repository.ClientRepository;
import com.example.backend.vo.ClientCreationRequest;
import com.example.backend.vo.ClientResponse;

@Service
public class ClientServiceImpl implements ClientService{

    private static final Logger logger = LoggerFactory.getLogger(ClientServiceImpl.class);

    private final ClientRepository repository;

    @Autowired
    public ClientServiceImpl(final ClientRepository repository){
        this.repository = repository;
    }

    @Override
    public ClientResponse createClient(final ClientCreationRequest request){
        logger.debug("Start service createClient()");
        try {
            final ClientEntity client = new ClientEntity(UUID.randomUUID().toString(), request.getName());
            repository.insertClient(client);
            logger.debug("End service createClient()");
            return new ClientResponse(client);
        } catch (Exception ex){
            logger.debug("Fail to insert a new client");
            throw ex;
        }
    }

    @Override
    public ClientResponse getClientById(final String id){
        logger.debug("Start service getClientById()");
        ClientEntity clientEntity = repository.findClientById(id);
        logger.debug("End service getClientById()");
        return convertClientEntityToClientResponse(clientEntity);
    }
}
