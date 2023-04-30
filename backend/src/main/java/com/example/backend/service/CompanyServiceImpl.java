package com.example.backend.service;

import static com.example.backend.helper.EntityConversionHelper.convertCompanyEntityToCompanyResponse;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.domain.CompanyEntity;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.vo.CompanyCreationRequest;
import com.example.backend.vo.CompanyResponse;

@Service
public class CompanyServiceImpl implements CompanyService{

    private static final Logger logger = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private final CompanyRepository repository;

    @Autowired
    public CompanyServiceImpl(final CompanyRepository repository){
      this.repository = repository;
    }

    @Override
    public CompanyResponse createCompany(final CompanyCreationRequest request){
        logger.debug("Start service createCompany()");
        try {
            final CompanyEntity company = new CompanyEntity(UUID.randomUUID().toString(), request.getDisplayName());
            repository.insertCompany(company);
            logger.debug("End service createCompany()");
            return new CompanyResponse(company);
        } catch (Exception ex){
            logger.debug("Fail to insert a new client");
            throw ex;
        }
    }

    @Override
    public CompanyResponse getCompanyById(final String id){
        logger.debug("Start service getCompanyById()");
        CompanyEntity companyEntity = repository.findCompanyById(id);
        logger.debug("End service getCompanyById()");
        return convertCompanyEntityToCompanyResponse(companyEntity);
    }
}
