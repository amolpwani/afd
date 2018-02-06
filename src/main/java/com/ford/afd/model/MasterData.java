package com.ford.afd.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "TAFD001_MASTER_DATA")
public class MasterData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TAFD001_MSTR_DATA_D")
    private long id;
    
    @Column(name = "TAFD001_MSTR_DATA_N")
    private String name;
    
    @Column(name = "TAFD001_MSTR_DATA_X")
    private String description;
    
    @Column(name = "TAFD001_MSTR_DATA_ACTV_F")
    private boolean active;
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "masterData", cascade = CascadeType.ALL)
    private List<MasterDataItem> masterDataItemList;

    public MasterData(String name, String description, boolean active) {
        this.name = name;
        this.description = description;
        this.active = active;
    }

    public MasterData() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<MasterDataItem> getMasterDataItemList() {
		return masterDataItemList;
	}

	public void setMasterDataItemList(List<MasterDataItem> masterDataItemList) {
		this.masterDataItemList = masterDataItemList;
	}
}

