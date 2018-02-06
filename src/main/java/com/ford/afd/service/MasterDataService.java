package com.ford.afd.service;

import com.ford.afd.model.MasterData;
import com.ford.afd.repository.MasterDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 
 * Service class to perform add, remove, update,search operation in MasterData table.
 */
@Service
public class MasterDataService {
    @Autowired
    private MasterDataRepository masterDataRepository;

    public List<MasterData> allMasterData() {
        return masterDataRepository.findAll();
    }

    public MasterData findMasterDataById(long id) {
        return masterDataRepository.findOne(id);
    }

    public MasterData saveMasterData(MasterData masterData) {
        return masterDataRepository.save(masterData);
    }

    public void deleteMasterData(MasterData masterData) {
        masterDataRepository.delete(masterData);
    }
}
