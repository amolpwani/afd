package com.ford.afd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.MasterDataItem;
import com.ford.afd.service.MasterDataItemService;

/**
 * This Controller is Used to interact with MasterDataItem Table.
 */
@CrossOrigin
@RestController
@RequestMapping("/masterdataitem")
public class MasterDataItemController {

    @Autowired
    private MasterDataItemService masterDataItemService;

    /**
     * To get all MasterDataItems.
     * @return List<MasterDataDataItem>
     */
	@RequestMapping(value = "getMasterDataItem", method = RequestMethod.GET)
	public List<MasterDataItem> directMasterDataItemList() {
		return masterDataItemService.allMasterDataItems();
	}

	/**
	 * To get MasterDataItem using id 
	 * @param id
	 * @return MasterDataItem
	 */
	@RequestMapping(value = "getMasterDataItem/{id}", method = RequestMethod.GET)
	public MasterDataItem getMasterDataItemById(@PathVariable Integer id ) {
		return masterDataItemService.findMasterDataItemById(id);
	}

    /**
     * To get MasterDataItems for given masterDataId.
     * @return List<MasterDataDataItem>
     */
	@RequestMapping(value = "getMasterDataItemByMasterDataId/{masterDataId}", method = RequestMethod.GET)
	public List<MasterDataItem> listMasterDataItemByMasterDataId(@PathVariable Integer masterDataId) {
		return masterDataItemService.findMasterDataItemByMasterDataId(masterDataId);
	}

	/**
	 * Update MasterDataItem for given masterDataItem in RequestBody.
	 * @param id 
	 * @param masterDataItem
	 * @return MasterDataItem
	 */
	@RequestMapping(value = "getMasterDataItem/{id}",method = RequestMethod.PUT)
	public MasterDataItem updateMasterDataItem(@PathVariable long id, @RequestBody MasterDataItem masterDataItem){
		return masterDataItemService.saveMasterDataItem(masterDataItem);
	}

	/**
	 * Delete MasterDataItem for given id.
	 * @param id
	 */
	@RequestMapping(value = "getMasterDataItem/{id}", method = RequestMethod.DELETE)
	public void deleteMasterDataItemById(@PathVariable Integer id ){
		masterDataItemService.deleteMasterDataItem(masterDataItemService.findMasterDataItemById(id));
	}

	/**
	 * Create MasterDataItem for given masterDataItem in RequestBody.
	 * @param masterDataItem
	 * @return MasterDataItem
	 */
	@RequestMapping(value = "getMasterDataItem", method = RequestMethod.POST)
	public MasterDataItem createMasterDataItem(@RequestBody MasterDataItem masterDataItem) {
		return masterDataItemService.saveMasterDataItem(masterDataItem);
	}
}
