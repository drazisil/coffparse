import { readFileSync } from 'fs'
import {
    checkPEOffset,
    checkPESig,
    checkState,
    IProcessorState,
    readByte4,
} from './src'

const buf = readFileSync('./mcity.exe')

let programCounter = 0
const STEP = 4
const MAX_COUNT = 512

const STATE: IProcessorState = {
    s0: 0,
    s1: 0,
    s2: 0,
}

let InstructionRegister = Buffer.alloc(8)

while (programCounter <= MAX_COUNT) {
    // Break if past input end
    if (programCounter >= buf.byteLength) {
        console.info('End of input reached')
        break
    }

    // Fetch
    const byte = readByte4(buf, programCounter)

    // Decode

    if (checkPESig(byte)) {
        console.log(
            `PR Header located at offset ${programCounter.toString(16)}`
        )

        if (programCounter !== 0) {
            if (checkPEOffset(buf, programCounter) != true) {
                throw new Error(
                    'The address at 0x3c does not match the location to the PR header'
                )
            }
        }

        break
    }

    programCounter = programCounter + STEP
}
