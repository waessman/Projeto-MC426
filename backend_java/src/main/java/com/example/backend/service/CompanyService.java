package com.example.backend.service;

import com.example.backend.vo.CompanyCreationRequest;
import com.example.backend.vo.CompanyResponse;

public interface CompanyService {

    CompanyResponse createCompany(final CompanyCreationRequest request);

    CompanyResponse getCompanyById(final String id);
}
