import { Transfer } from '../generated/Contract/Contract';
import { TransferEvent } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleTransfer(event: Transfer): void {
	// initializing our transferEvent entity
	let transferEvent = new TransferEvent(event.transaction.hash.toHex());

	// accessing the amount transferred
	let amount = event.params.value.toBigDecimal();
	// storing it to object
	transferEvent.amount = amount;

	// accessing the sender address and storing it
	transferEvent.sender = event.params.from;
	// accessing the destination address and storing it
	transferEvent.destination = event.params.to;

	transferEvent.block = event.block.number;
	transferEvent.timestamp = event.block.timestamp;
	transferEvent.transaction = event.transaction.hash;

	// Saving data to table
	transferEvent.save();
}
