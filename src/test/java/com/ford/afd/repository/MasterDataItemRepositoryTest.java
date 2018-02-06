package com.ford.afd.repository;

import com.ford.afd.model.MasterData;
import com.ford.afd.model.MasterDataItem;
import com.ford.afd.repository.MasterDataItemRepository;
import com.ford.afd.service.MasterDataService;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MasterDataItemRepositoryTest {

    @Autowired
    private MasterDataItemRepository masterDataItemRepository;
    
	@Autowired
	private MasterDataService masterDataService;

    @After
    public void tearDown() {
        masterDataItemRepository.deleteAll();
        
		MasterData listData = getMasterData();
		masterDataService.saveMasterData(listData);
    }

    @Test
    public void directMasterData() {
    	
        // Arrange
        MasterDataItem listItem1 = new MasterDataItem("BU1", "TestingBusiness", true , 1);
        listItem1.setMasterData(getMasterData());
		MasterDataItem masterDataItem1 = masterDataItemRepository.save(listItem1);
		
        MasterDataItem listItem2 = new MasterDataItem("BU2", "TestingBusiness", false, 2);
        listItem2.setMasterData(getMasterData());
		MasterDataItem masterDataItem2 = masterDataItemRepository.save(listItem2);
        //Act
        List<MasterDataItem> actualMasterDataItems = masterDataItemRepository.findAll();
        //Assert
        assertThat(actualMasterDataItems).containsExactlyInAnyOrder(masterDataItem1, masterDataItem2);
    }
    
	private MasterData getMasterData() {
		MasterData listData = new MasterData("List1", "Description1", true);
		listData.setId(100);
		return listData;
	}

    @Test
    public void masterDataItemById() {
        // Arrange
        MasterDataItem listItem1 = new MasterDataItem("BU1", "TestingBusiness", true , 1);
        listItem1.setMasterData(getMasterData());
        
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(listItem1);
        // Act
        MasterDataItem actualMasterDataItem = masterDataItemRepository.findOne(testMasterDataItem.getId());
        // Assert
        assertThat(actualMasterDataItem).isEqualToComparingFieldByField(testMasterDataItem);
    }

    @Test
    public void updateMasterDataItems() {
        // Arrange
        MasterDataItem listItem1 = new MasterDataItem("BU1", "TestingBusiness", true , 1);
        listItem1.setMasterData(getMasterData());
        
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(listItem1);
        testMasterDataItem.setDescription("Updated Testing Business");
        //Act
        MasterDataItem actualMasterDataItem = masterDataItemRepository.save(testMasterDataItem);
        //Assert
        MasterDataItem updatedMasterDataItem = masterDataItemRepository.findOne(testMasterDataItem.getId());
        assertThat(updatedMasterDataItem.getDescription()).isEqualTo(actualMasterDataItem.getDescription());
    }

    @Test
    public void deleteMasterDataItemsById() {
        // Arrange
    	MasterDataItem listItem1 = new MasterDataItem("BU1", "TestingBusiness", true , 1);
        listItem1.setMasterData(getMasterData());
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(listItem1);
        //Act
        masterDataItemRepository.delete(testMasterDataItem);
        //Assert
        assertThat(masterDataItemRepository.findOne(testMasterDataItem.getId())).isNull();
    }
}