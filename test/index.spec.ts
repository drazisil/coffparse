import assert from "assert";
import { describe, test } from "mocha";
import { checkState, setState, IProcessorState } from "../src/index";

describe('checkState()', function() {
    test('returns T1', function() {
        // Arrange
        const state: IProcessorState = { s0: 0, s1: 1, s2: 0}
        const expectedResult = 'T1'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns T1I', function() {
        // Arrange
        const state: IProcessorState = { s0: 0, s1: 1, s2: 1}
        const expectedResult = 'T1I'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns T2', function() {
        // Arrange
        const state: IProcessorState = { s0: 0, s1: 0, s2: 1}
        const expectedResult = 'T2'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns WAIT', function() {
        // Arrange
        const state: IProcessorState = { s0: 0, s1: 0, s2: 0}
        const expectedResult = 'WAIT'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns T3', function() {
        // Arrange
        const state: IProcessorState = { s0: 1, s1: 0, s2: 0}
        const expectedResult = 'T3'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns STOPPED', function() {
        // Arrange
        const state: IProcessorState = { s0: 1, s1: 1, s2: 0}
        const expectedResult = 'STOPPED'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns T4', function() {
        // Arrange
        const state: IProcessorState = { s0: 1, s1: 1, s2: 1}
        const expectedResult = 'T4'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('returns T5', function() {
        // Arrange
        const state: IProcessorState = { s0: 1, s1: 0, s2: 1}
        const expectedResult = 'T5'

        // Act
        const result = checkState(state)

        // Assert

        assert.strictEqual(result, expectedResult)
    })

    test('throws when passed an invalid state', function() {
        // Arrange
        // @ts-ignore: Testing invalid state
        const state: IProcessorState = { s0: 0, s1: 1, s2: 2} 
        const expectedResult = 'T1'

        // Assert
        assert.throws(() => checkState(state), /Unknown State/)
    })
})

describe('setState()', function() {
    test('returns {0,1,0}', function() {
        // Arrange
        const inputState = 'T1'
        const expectedState: IProcessorState = {s0: 0, s1: 1, s2: 0}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {0,1,1}', function() {
        // Arrange
        const inputState = 'T1I'
        const expectedState: IProcessorState = {s0: 0, s1: 1, s2: 1}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {0,0,1}', function() {
        // Arrange
        const inputState = 'T2'
        const expectedState: IProcessorState = {s0: 0, s1: 0, s2: 1}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {0,0,0}', function() {
        // Arrange
        const inputState = 'WAIT'
        const expectedState: IProcessorState = {s0: 0, s1: 0, s2: 0}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {1,0,0}', function() {
        // Arrange
        const inputState = 'T3'
        const expectedState: IProcessorState = {s0: 1, s1: 0, s2: 0}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {1,1,0}', function() {
        // Arrange
        const inputState = 'STOPPED'
        const expectedState: IProcessorState = {s0: 1, s1: 1, s2: 0}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {1,1,1}', function() {
        // Arrange
        const inputState = 'T4'
        const expectedState: IProcessorState = {s0: 1, s1: 1, s2: 1}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('returns {1,0,1}', function() {
        // Arrange
        const inputState = 'T5'
        const expectedState: IProcessorState = {s0: 1, s1: 0, s2: 1}

        // Act
        const state = setState(inputState)

        // Assert
        assert.deepEqual(state, expectedState)
    })

    test('throws when passed an invalid state', function() {
        // Arrange
        const inputState = 'BROKEN_STATE'

        // Assert
        assert.throws(() => setState(inputState), /Unknown State/)
    })
})