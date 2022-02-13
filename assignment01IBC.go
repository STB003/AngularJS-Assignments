package assignment01IBC

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

// Block
type Block struct {
	transactions []string
	prevPointer  *Block
	prevHash     string
	currentHash  string
}

//
func CalculateHash(inputBlock *Block) string {
	hash := sha256.Sum256([]byte(fmt.Sprintln(inputBlock)))
	return hex.EncodeToString(hash[:])
}

//
func InsertBlock(transactionsToInsert []string, chainHead *Block) *Block {

	if chainHead == nil {
		chainHead = &Block{}
		chainHead.transactions = transactionsToInsert
		return chainHead
	}

	var newBlock *Block
	newBlock = &Block{}

	newBlock.transactions = transactionsToInsert
	newBlock.prevPointer = chainHead
	newBlock.prevHash = CalculateHash(chainHead)
	newBlock.currentHash = CalculateHash(newBlock)

	chainHead = newBlock

	return chainHead

}

//
func ChangeBlock(oldTrans string, newTrans string, chainHead *Block) {

	var tempBlock = chainHead
	for tempBlock != nil {
		for i, transaction := range tempBlock.transactions {
			if transaction == oldTrans {
				tempBlock.transactions[i] = newTrans
				return
			}
		}

		tempBlock = tempBlock.prevPointer
	}
}

//
func ListBlocks(chainHead *Block) {

	var tempBlock = chainHead
	for tempBlock != nil {
		fmt.Println(tempBlock.transactions)
		tempBlock = tempBlock.prevPointer
	}

}

//
func VerifyChain(chainHead *Block) {

	//checking chain head

	if chainHead == nil {
		return
	}

	var tempBlock = chainHead.prevPointer
	var tempHash = chainHead.prevHash
	for tempBlock != nil {
		if CalculateHash(tempBlock) != tempHash {
			fmt.Println("Block chain is compromised")
			return
		}
		tempHash = tempBlock.prevHash
		tempBlock = tempBlock.prevPointer
	}
	fmt.Println("Block chain is unchanged")

}


