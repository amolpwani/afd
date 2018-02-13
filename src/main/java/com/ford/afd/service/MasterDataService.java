package com.ford.afd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ford.afd.model.MasterData;
import com.ford.afd.repository.MasterDataRepository;

/**
 * 
 * Service class to perform add, remove, update,search operation in MasterData table.
 */
@Service
public class MasterDataService {
	private static final String DUPLICATE_MASTERDATA_NAME = "duplicateName";
	
    @Autowired
    private MasterDataRepository masterDataRepository;

    public List<MasterData> allMasterData() {
        return masterDataRepository.findAll();
    }

    public MasterData findMasterDataById(int id) {
        return masterDataRepository.findOne(id);
    }

    public MasterData saveMasterData(MasterData masterData) {
    	MasterData creaOrUpMasterDataItem = null;
    	if (masterData.getId() != 0) {
    		creaOrUpMasterDataItem = masterDataRepository.save(masterData);
    	} else {
    		if (!masterDataRepository.existsByName(masterData.getName())) {
    			creaOrUpMasterDataItem = masterDataRepository.save(masterData);
    		} else {
    			masterData.setName(DUPLICATE_MASTERDATA_NAME);
    			creaOrUpMasterDataItem = masterData;
    		}
    	}
    	
        return creaOrUpMasterDataItem;
    }

    public void deleteMasterData(MasterData masterData) {
        masterDataRepository.delete(masterData);
    }
}
