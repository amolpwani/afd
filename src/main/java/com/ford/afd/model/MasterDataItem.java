package com.ford.afd.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TAFD002_MASTER_DATA_ITEM")
public class MasterDataItem extends BaseEntity<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TAFD002_MSTR_DATA_ITEM_D")
    private long id;
    
    @Column(name = "TAFD002_MSTR_DATA_ITEM_N")
    private String code;
    
    @Column(name = "TAFD002_MSTR_DATA_ITEM_X")
    private String description;
    
    @Column(name = "TAFD002_MSTR_DATA_ITEM_ACTV_F")
    private boolean active;
    
    @Column(name = "TAFD001_MSTR_DATA_D")
    private long parentMasterDataId;
    
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "TAFD001_MSTR_DATA_D", referencedColumnName = "TAFD001_MSTR_DATA_D", nullable = false, unique = true, insertable = false, updatable = false)
//    private MasterData masterData;

    public MasterDataItem(String code, String description, boolean active, long parentMasterDataId) {
        this.code = code;
        this.description = description;
        this.setActive(active);
        this.parentMasterDataId = parentMasterDataId;
    }
    
    public MasterDataItem() {
    	
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public long getParentMasterDataId() {
		return parentMasterDataId;
	}

	public void setParentMasterDataId(long parentMasterDataId) {
		this.parentMasterDataId = parentMasterDataId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

//	public MasterData getMasterData() {
//		return masterData;
//	}
//
//	public void setMasterData(MasterData masterData) {
//		this.masterData = masterData;
//	}
}
