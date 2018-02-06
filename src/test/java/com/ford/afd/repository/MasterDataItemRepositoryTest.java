package com.ford.afd.repository;

import com.ford.afd.model.MasterDataItem;
import com.ford.afd.repository.MasterDataItemRepository;
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

    @After
    public void tearDown() {
        masterDataItemRepository.deleteAll();
    }

    @Test
    public void directMasterData() {
        // Arrange
        MasterDataItem masterDataItem1 = masterDataItemRepository.save(new MasterDataItem("BU1", "TestingBusiness", true , 1));
        MasterDataItem masterDataItem2 = masterDataItemRepository.save(new MasterDataItem("BU2", "TestingBusiness", false, 2));
        //Act
        List<MasterDataItem> actualMasterDataItems = masterDataItemRepository.findAll();
        //Assert
        assertThat(actualMasterDataItems).containsExactlyInAnyOrder(masterDataItem1, masterDataItem2);
    }

    @Test
    public void masterDataItemById() {
        // Arrange
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(new MasterDataItem("BU1", "TestingBusiness", true , 1));
        // Act
        MasterDataItem actualMasterDataItem = masterDataItemRepository.findOne(testMasterDataItem.getId());
        // Assert
        assertThat(actualMasterDataItem).isEqualToComparingFieldByField(testMasterDataItem);
    }

    @Test
    public void updateMasterDataItems() {
        // Arrange
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(new MasterDataItem("BU1", "TestingBusiness", true, 1 ));
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
        MasterDataItem testMasterDataItem = masterDataItemRepository.save(new MasterDataItem("BU1", "TestingBusiness", true, 1 ));
        //Act
        masterDataItemRepository.delete(testMasterDataItem);
        //Assert
        assertThat(masterDataItemRepository.findOne(testMasterDataItem.getId())).isNull();
    }
}