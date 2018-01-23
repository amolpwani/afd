package com.ford.afd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ford.afd.model.FoundationData;
import com.ford.afd.repository.FoundationDataRepository;

@Service
public class FoundationDataService {
    @Autowired
    private FoundationDataRepository foundationDataRepository;

    public List<FoundationData> allFoundationData() {
        return foundationDataRepository.findAll();
    }

    public FoundationData findFoundationDataById(long id) {
        return foundationDataRepository.findOne(id);
    }

    public FoundationData saveFoundationData(FoundationData foundationData) {
        return foundationDataRepository.save(foundationData);
    }

    public void deleteFoundationData(FoundationData listData) {
        foundationDataRepository.delete(listData);
    }
}
