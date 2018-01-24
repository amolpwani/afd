package com.ford.afd.service;

import java.util.ArrayList;
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
           	
    	Iterable<FoundationData> itrIist = foundationDataRepository.findAll();
    	List<FoundationData> list = new ArrayList<FoundationData>();
    	for (FoundationData data : itrIist) {
    		list.add(data);
    	}
    	
    	return list;
    }

    public FoundationData findFoundationDataById(long id) {
        return foundationDataRepository.findOne(id);
    }
    
    public List<FoundationData> findFoundationDataByRowId(long rowId) {
        return foundationDataRepository.findByRowId(rowId);
    }

    public FoundationData saveFoundationData(FoundationData foundationData) {
        return foundationDataRepository.save(foundationData);
    }

    public void deleteFoundationData(FoundationData foundationData) {
        foundationDataRepository.delete(foundationData);
    }
    
    public void deleteFoundationDataByRowId(long rowId) {
        foundationDataRepository.removeByRowId(rowId);
    }
}
