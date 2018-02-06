package com.ford.afd.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.MasterData;
import com.ford.afd.service.MasterDataService;

/**
 * This Controller is Used to interact with MasterData Table.
 */
@CrossOrigin
@RestController
@RequestMapping("/masterdata")
public class MasterDataController {
    @Autowired
    private MasterDataService masterDataService;

    /**
     * To get all MasterDatas.
     * @return List<MasterData>
     */
	@RequestMapping(value = "getMasterData",method = RequestMethod.GET)
	public List<MasterData> directList() {
		return masterDataService.allMasterData();
	}

	/**
	 * To get MasterData using id 
	 * @param id
	 * @return MasterData
	 */
	@RequestMapping(value = "getMasterData/{id}",method = RequestMethod.GET)
	public MasterData getMasterDataById(@PathVariable long id) {
		return masterDataService.findMasterDataById(id);
	}

	/**
	 * Update MasterData for given masterData in RequestBody.
	 * @param id 
	 * @param masterData
	 * @return MasterData
	 */
	@RequestMapping(value="getMasterData/{id}",method=RequestMethod.PUT)
	public MasterData updateMasterData(@PathVariable long id, @RequestBody MasterData masterData) {
		return masterDataService.saveMasterData(masterData);
	}

	/**
	 * Delete MasterData for given id.
	 * @param id
	 */
	@RequestMapping(value = "getMasterData/{id}",method = RequestMethod.DELETE)
	public void deleteMasterDataById(@PathVariable long id) {
		masterDataService.deleteMasterData(masterDataService.findMasterDataById(id));
	}

	/**
	 * Create MasterData for given masterData in RequestBody.
	 * @param masterData
	 * @return MasterData
	 */
	@RequestMapping(value="getMasterData",method=RequestMethod.POST)
	public MasterData createMasterData(@RequestBody MasterData masterData) {
		return masterDataService.saveMasterData(masterData);
	}
}
