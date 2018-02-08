package com.ford.afd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ford.afd.model.FoundationDataRow;
import com.ford.afd.repository.FoundationDataRowRepository;

/**
 * 
 * Service class to perform add, remove, update,search operation in FoundationDataRow table.
 */
@Service
public class FoundationDataRowService {
    @Autowired
    private FoundationDataRowRepository foundationDataRowRepository;

    public List<FoundationDataRow> allFoundationDataRow() {
           	
    	Iterable<FoundationDataRow> itrIist = foundationDataRowRepository.findAll();
    	List<FoundationDataRow> list = new ArrayList<FoundationDataRow>();
    	for (FoundationDataRow data : itrIist) {
    		list.add(data);
    	}
    	
    	return list;
    }
    
    public List<Long> allFoundationDataRowIds() {
    	return foundationDataRowRepository.findDistinctRowIds();
    }

    public FoundationDataRow findFoundationDataRowById(long id) {
        return foundationDataRowRepository.findOne(id);
    }
    
    public List<FoundationDataRow> findFoundationDataRowByRowId(long rowId) {
        return foundationDataRowRepository.findByRowId(rowId);
    }

    public FoundationDataRow saveFoundationDataRow(FoundationDataRow foundationDataRow) {
        return foundationDataRowRepository.save(foundationDataRow);
    }

    public void deleteFoundationDataRow(FoundationDataRow foundationDataRow) {
        foundationDataRowRepository.delete(foundationDataRow);
    }
    
    public void deleteFoundationDataRowByRowId(long rowId) {
        foundationDataRowRepository.removeByRowId(rowId);
    }
    
    public long findNewRowId() {
    	return foundationDataRowRepository.getMaxRowId() + 1;
    }
}
