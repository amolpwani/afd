package com.ford.afd.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.service.FoundationDataColumnService;

/**
 * This Controller is Used to interact with FoundationDatColumn Table.
 */
@CrossOrigin
@RestController
@RequestMapping("/foundationdatacolumn")
public class FoundationDataColumnController {
    @Autowired
    private FoundationDataColumnService foundationDataColumnService;

    /**
     * To get all FoundationDataColumns.
     * @return List<FoundationDataColumn>
     */
	@RequestMapping(value = "getFoundationColumn",method = RequestMethod.GET)
	public List<FoundationDataColumn> directFoundationDataColumnList(){
		return foundationDataColumnService.allFoundationDataColumn();
	}

	/**
	 * To get FoundationDataColumn using id 
	 * @param id
	 * @return FoundationDataColumn
	 */
	@RequestMapping(value = "getFoundationColumn/{id}",method = RequestMethod.GET)
	public FoundationDataColumn foundationDataColumnById(@PathVariable long id ) {
		return foundationDataColumnService.findFoundationDataColumnById(id);
	}

	/**
	 * Update Foundationdatacolumn for given foundationdatacolumn in RequestBody.
	 * @param id 
	 * @param foundationDataColumn
	 * @return FoundationDataColumn
	 */
	@RequestMapping(value="getFoundationColumn/{id}",method=RequestMethod.PUT)
	public FoundationDataColumn updateFoundationDataColumn(@PathVariable long id, @RequestBody FoundationDataColumn foundationDataColumn){
		return foundationDataColumnService.saveFoundationDataColumn(foundationDataColumn);
	}

	/**
	 * Delete Foundationdatacolumn for given id.
	 * @param id
	 */
	@RequestMapping(value = "getFoundationColumn/{id}",method = RequestMethod.DELETE)
	public void deleteFoundationDataColumnById(@PathVariable long id ){
		foundationDataColumnService.deleteFoundationDataColumn(foundationDataColumnService.findFoundationDataColumnById(id));
	}

	/**
	 * Create Foundationdatacolumn for given foundationdatacolumn in RequestBody.
	 * @param foundationDataColumn
	 * @return FoundationDataColumn
	 */
	@RequestMapping(value="getFoundationColumn",method=RequestMethod.POST)
	public FoundationDataColumn createFoundationDataColumn(@RequestBody FoundationDataColumn foundationDataColumn) {
		return foundationDataColumnService.saveFoundationDataColumn(foundationDataColumn);
	}

}
