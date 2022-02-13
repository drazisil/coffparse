import assert from "assert";
import { readFileSync } from "fs";

export function readByte2(buffer: Buffer, index:number) {
    return buffer.slice(index, index+2)
}

export function readByte4(buffer: Buffer, index:number) {
    return buffer.slice(index, index+4)
}

const buf = readFileSync('./mcity.exe')

let counter = 0
const STEP = 4
const MAX_COUNT = 512
const PE_SIG = Buffer.from(['P', 'E', String.fromCharCode(0x00), String.fromCharCode(0x00)].join(''))

console.log(PE_SIG.toString("hex"))

while (counter <= MAX_COUNT) {
    const byte = readByte4(buf, counter)

    console.log(byte.toString("hex"))
    if (byte.toString('hex') === PE_SIG.toString('hex') ) {
        console.log(counter)
        console.log(byte.toString("hex"))        
        console.log(byte.toString())

        const peIndex = counter
        const peOffset = buf.readInt32LE(0x3c)

        assert.strictEqual(peIndex, peOffset, "the PE offset did not match what 0x3c said")
        break
    }


    counter = counter + STEP
}

