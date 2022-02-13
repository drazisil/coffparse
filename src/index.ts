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

export interface IProcessorState {
    s0: 0 | 1
    s1: 0 | 1
    s2: 0 | 1
}

export function checkState(state: IProcessorState): string {
    const { s0, s1, s2 } = state

    if (s0 === 0 && s1 === 1 && s2 === 0) {
        return 'T1'
    }
    if (s0 === 0 && s1 === 1 && s2 === 1) {
        return 'T1I'
    }
    if (s0 === 0 && s1 === 0 && s2 === 1) {
        return 'T2'
    }
    if (s0 === 0 && s1 === 0 && s2 === 0) {
        return 'WAIT'
    }
    if (s0 === 1 && s1 === 0 && s2 === 0) {
        return 'T3'
    }
    if (s0 === 1 && s1 === 1 && s2 === 0) {
        return 'STOPPED'
    }
    if (s0 === 1 && s1 === 1 && s2 === 1) {
        return 'T4'
    }
    if (s0 === 1 && s1 === 0 && s2 === 1) {
        return 'T5'
    }
    throw new Error('Unknown State!')
}

export function setState(requestedState: string): IProcessorState {
    if (requestedState === 'T1') {
        return { s0: 0, s1: 1, s2: 0 }
    }

    if (requestedState === 'T1I') {
        return { s0: 0, s1: 1, s2: 1 }
    }

    if (requestedState === 'T2') {
        return { s0: 0, s1: 0, s2: 1 }
    }

    if (requestedState === 'WAIT') {
        return { s0: 0, s1: 0, s2: 0 }
    }

    if (requestedState === 'T3') {
        return { s0: 1, s1: 0, s2: 0 }
    }

    if (requestedState === 'STOPPED') {
        return { s0: 1, s1: 1, s2: 0 }
    }

    if (requestedState === 'T4') {
        return { s0: 1, s1: 1, s2: 1 }
    }

    if (requestedState === 'T5') {
        return { s0: 1, s1: 0, s2: 1 }
    }

    throw new Error('Unknown State!')
}
