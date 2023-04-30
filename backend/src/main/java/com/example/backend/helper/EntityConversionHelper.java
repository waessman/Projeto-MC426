package com.example.backend.helper;

import java.util.ArrayList;
import java.util.List;

import com.example.backend.domain.ClientEntity;
import com.example.backend.domain.CompanyEntity;
import com.example.backend.vo.ClientResponse;
import com.example.backend.vo.CompanyResponse;

public class EntityConversionHelper {

    private EntityConversionHelper() {
        super();
    }

    public static List<ClientResponse> covertListClientEntityToListClientResponse(final List<ClientEntity> clientEntityList){
        final List<ClientResponse> clientResponses = new ArrayList<>();
        for (ClientEntity clientEntity: clientEntityList) {
            clientResponses.add(convertClientEntityToClientResponse(clientEntity));
        }
        return clientResponses;
    }

    public static ClientResponse convertClientEntityToClientResponse(final ClientEntity clientEntity){
        var clientResponse = new ClientResponse();
        clientResponse.setUserId(clientEntity.getId());
        clientResponse.setName(clientEntity.getName());
        return clientResponse;
    }

    public static List<CompanyResponse> covertListCompanyEntityToListCompanyResponse(final List<CompanyEntity> companyEntityList){
        final List<CompanyResponse> companyResponses = new ArrayList<>();
        for (CompanyEntity companyEntity: companyEntityList) {
            companyResponses.add(convertCompanyEntityToCompanyResponse(companyEntity));
        }
        return companyResponses;
    }

    public static CompanyResponse convertCompanyEntityToCompanyResponse(final CompanyEntity clientEntity){
        var companyResponse = new CompanyResponse();
        companyResponse.setCompanyId(clientEntity.getId());
        companyResponse.setDisplayName(clientEntity.getDisplayName());
        return companyResponse;
    }
}
