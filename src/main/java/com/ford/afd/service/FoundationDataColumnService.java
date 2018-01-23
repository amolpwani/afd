package com.ford.afd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.repository.FoundationDataColumnRepository;

@Service
public class FoundationDataColumnService {
    @Autowired
    private FoundationDataColumnRepository foundationDataColumnRepository;

    public List<FoundationDataColumn> allFoundationDataColumn() {
        return foundationDataColumnRepository.findAll();
    }

    public FoundationDataColumn findFoundationDataColumnById(long id) {
        return foundationDataColumnRepository.findOne(id);
    }

    public FoundationDataColumn saveFoundationDataColumn(FoundationDataColumn foundationDataColumn) {
        return foundationDataColumnRepository.save(foundationDataColumn);
    }

    public void deleteFoundationDataColumn(FoundationDataColumn listData) {
        foundationDataColumnRepository.delete(listData);
    }
}
