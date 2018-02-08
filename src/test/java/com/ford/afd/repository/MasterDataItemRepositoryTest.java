package com.ford.afd.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ford.afd.model.MasterDataItem;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MasterDataItemRepositoryTest {

    @Autowired
    private MasterDataItemRepository masterDataItemRepository;
    
    @After
    public void tearDown() {
        masterDataItemRepository.deleteAll();
    }

    @Test
    public void directMasterData() {
    	String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
        // Arrange
        MasterDataItem listItem1 = new MasterDataItem(masterDataItem1Code, "TestingBusiness", true , 1);
        //listItem1.setMasterData(getMasterData());
		MasterDataItem masterDataItem1 = masterDataItemRepository.save(listItem1);
		
		masterDataItem1Code = "MasterDataItem" + System.nanoTime();
        MasterDataItem listItem2 = new MasterDataItem(masterDataItem1Code, "TestingBusiness", false, 2);
        //listItem2.setMasterData(getMasterData());
		MasterDataItem masterDataItem2 = masterDataItemRepository.save(listItem2);
        //Act
        List<MasterDataItem> actualMasterDataItems = masterDataItemRepository.findAll();
        //Assert
        assertThat(actualMasterDataItems).containsExactlyInAnyOrder(masterDataItem1, masterDataItem2);
    }

    @Test
    public void masterDataItemById() {
    	String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
        // Arrange
        MasterDataItem listItem1 = new MasterDataItem(masterDataItem1Code, "TestingBusiness", true , 1);
        //listItem1.setMasterData(getMasterData());
        
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(listItem1);
        // Act
        MasterDataItem actualMasterDataItem = masterDataItemRepository.findOne(testMasterDataItem.getId());
        // Assert
        assertThat(actualMasterDataItem).isEqualToComparingFieldByField(testMasterDataItem);
    }

    @Test
    public void updateMasterDataItems() {
    	String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
        // Arrange
        MasterDataItem listItem1 = new MasterDataItem(masterDataItem1Code, "TestingBusiness", true , 1);
        //listItem1.setMasterData(getMasterData());
        
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
    	String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
        // Arrange
    	MasterDataItem listItem1 = new MasterDataItem(masterDataItem1Code, "TestingBusiness", true , 1);
        //listItem1.setMasterData(getMasterData());
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(listItem1);
        //Act
        masterDataItemRepository.delete(testMasterDataItem);
        //Assert
        assertThat(masterDataItemRepository.findOne(testMasterDataItem.getId())).isNull();
    }
}