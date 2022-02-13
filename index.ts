import assert from 'assert'
import { readFileSync } from 'fs'

export function readByte2(buffer: Buffer, index: number) {
    return buffer.slice(index, index + 2)
}

export function readByte4(buffer: Buffer, index: number) {
    return buffer.slice(index, index + 4)
}

export function checkPESig(bytes: Buffer): boolean {
    const PE_SIG = Buffer.from(
        ['P', 'E', String.fromCharCode(0x00), String.fromCharCode(0x00)].join(
            ''
        )
    )
    return bytes.toString('hex') === PE_SIG.toString('hex')
}

export function checkPEOffset(buf: Buffer, counter: number): boolean {
    const peOffset = buf.readInt32LE(0x3c)
    return counter === peOffset
}

const buf = readFileSync('./mcity.exe')

let counter = 0
const STEP = 4
const MAX_COUNT = 512

while (counter <= MAX_COUNT) {
    const byte = readByte4(buf, counter)

    if (checkPESig(byte)) {
        console.log(`PR Header located at offset ${counter.toString(16)}`)

        if (counter !== 0) {
            if (checkPEOffset(buf, counter) != true) {
                throw new Error(
                    'The address at 0x3c does not match the location to the PR header'
                )
            }
        }

        break
    }

    counter = counter + STEP
}
