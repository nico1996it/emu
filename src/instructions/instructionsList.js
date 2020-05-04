import LDA from "./LDA";
import STA from "./STA";
import TAX from "./TAX";
import TAY from "./TAY";
import LDX from "./LDX";
import LDY from "./LDY";
import STX from "./STX";
import STY from "./STY";
import TXA from "./TXA";
import TYA from "./TYA";
import INC from "./INC";
import INX from "./INX";
import INY from "./INY";
import DEC from "./DEC";
import DEX from "./DEX";
import DEY from "./DEY";
import BCC from "./BCC";
import BCS from "./BCS";
import BEQ from "./BEQ";
import CPX from "./CPX";
import BNE from "./BNE";
import BPL from "./BPL";
import BMI from "./BMI";
import BVC from "./BVC";
import BVS from "./BVS";
import CLC from "./CLC";
import CLI from "./CLI";
import CLV from "./CLV";
import SEC from "./SEC";
import SEI from "./SEI";
import PHA from "./PHA";
import PLA from "./PLA";
import CPY from "./CPY";
import TSX from "./TSX";
import TXS from "./TXS";
import PHP from "./PHP";
import PLP from "./PLP";
import AND from "./AND";
import EOR from "./EOR";
import ORA from "./ORA";
import BIT from "./BIT";
import CMP from "./CMP";
import ASL from "./ASL";
import LSR from "./LSR";
import ROL from "./ROL";
import ROR from "./ROR";
import JMP from "./JMP";
import JSR from "./JSR";
import RTS from "./RTS";
import ADC from "./ADC";
import SBC from "./SBC";
import NOP from "./NOP";
import BRK from "./BRK";
import RTI from "./RTI";
import CLD from "./CLD";
import SED from "./SED";

var instructions = [];
instructions[0xa9] = { i: LDA, b: 2, c: 2, m: "Immediate" };
instructions[0xa5] = { i: LDA, b: 2, c: 3, m: "ZeroPage" };
instructions[0xb5] = { i: LDA, b: 2, c: 4, m: "ZeroPageX" };
instructions[0xad] = { i: LDA, b: 3, c: 4, m: "Absolute" };
instructions[0xbd] = { i: LDA, b: 3, c: 4, m: "AbsoluteX" };
instructions[0xb9] = { i: LDA, b: 3, c: 4, m: "AbsoluteY" };
instructions[0xa1] = { i: LDA, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0xb1] = { i: LDA, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0xa2] = { i: LDX, b: 2, c: 2, m: "Immediate" };
instructions[0xa6] = { i: LDX, b: 2, c: 3, m: "ZeroPage" };
instructions[0xb6] = { i: LDX, b: 2, c: 4, m: "ZeroPageY" };
instructions[0xae] = { i: LDX, b: 3, c: 4, m: "Absolute" };
instructions[0xbe] = { i: LDX, b: 3, c: 4, m: "AbsoluteY" };

instructions[0x86] = { i: STX, b: 2, c: 3, m: "ZeroPage" };
instructions[0x96] = { i: STX, b: 2, c: 4, m: "ZeroPageY" };
instructions[0x8e] = { i: STX, b: 3, c: 4, m: "Absolute" };

instructions[0x84] = { i: STY, b: 2, c: 3, m: "ZeroPage" };
instructions[0x94] = { i: STY, b: 2, c: 4, m: "ZeroPageY" };
instructions[0x8c] = { i: STY, b: 3, c: 4, m: "Absolute" };

instructions[0xa0] = { i: LDY, b: 2, c: 2, m: "Immediate" };
instructions[0xa4] = { i: LDY, b: 2, c: 3, m: "ZeroPage" };
instructions[0xb4] = { i: LDY, b: 2, c: 4, m: "ZeroPageY" };
instructions[0xac] = { i: LDY, b: 3, c: 4, m: "Absolute" };
instructions[0xbc] = { i: LDY, b: 3, c: 4, m: "AbsoluteY" };

instructions[0x85] = { i: STA, b: 2, c: 3, m: "ZeroPage" };
instructions[0x95] = { i: STA, b: 2, c: 4, m: "ZeroPageX" };
instructions[0x8d] = { i: STA, b: 3, c: 4, m: "Absolute" };
instructions[0x9d] = { i: STA, b: 3, c: 5, m: "AbsoluteX" };
instructions[0x99] = { i: STA, b: 3, c: 5, m: "AbsoluteY" };
instructions[0x81] = { i: STA, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0x91] = { i: STA, b: 2, c: 6, m: "IndirectIndexed" };

instructions[0xaa] = { i: TAX, b: 1, c: 2, m: "Implied" };
instructions[0xa8] = { i: TAY, b: 1, c: 2, m: "Implied" };

instructions[0x8a] = { i: TXA, b: 1, c: 2, m: "Implied" };
instructions[0x98] = { i: TYA, b: 1, c: 2, m: "Implied" };

instructions[0xe6] = { i: INC, b: 2, c: 5, m: "ZeroPage" };
instructions[0xf6] = { i: INC, b: 2, c: 6, m: "ZeroPageX" };
instructions[0xee] = { i: INC, b: 3, c: 6, m: "Absolute" };
instructions[0xfe] = { i: INC, b: 3, c: 7, m: "AbsoluteX" };

instructions[0xe8] = { i: INX, b: 1, c: 2, m: "Implied" };
instructions[0xc8] = { i: INY, b: 1, c: 2, m: "Implied" };

instructions[0xc6] = { i: DEC, b: 2, c: 5, m: "ZeroPage" };
instructions[0xd6] = { i: DEC, b: 2, c: 6, m: "ZeroPageX" };
instructions[0xce] = { i: DEC, b: 3, c: 6, m: "Absolute" };
instructions[0xde] = { i: DEC, b: 3, c: 7, m: "AbsoluteX" };

instructions[0xca] = { i: DEX, b: 1, c: 2, m: "Implied" };
instructions[0x88] = { i: DEY, b: 1, c: 2, m: "Implied" };

instructions[0x90] = { i: BCC, b: 2, c: 2, m: "Relative" };
instructions[0xb0] = { i: BCS, b: 2, c: 2, m: "Relative" };
instructions[0xf0] = { i: BEQ, b: 2, c: 2, m: "Relative" };
instructions[0x30] = { i: BMI, b: 2, c: 2, m: "Relative" };
instructions[0xd0] = { i: BNE, b: 2, c: 2, m: "Relative" };
instructions[0x10] = { i: BPL, b: 2, c: 2, m: "Relative" };
instructions[0x50] = { i: BVC, b: 2, c: 2, m: "Relative" };
instructions[0x70] = { i: BVS, b: 2, c: 2, m: "Relative" };

instructions[0xe0] = { i: CPX, b: 2, c: 2, m: "Immediate" };
instructions[0xe4] = { i: CPX, b: 2, c: 3, m: "ZeroPage" };
instructions[0xec] = { i: CPX, b: 3, c: 4, m: "Absolute" };

instructions[0xc0] = { i: CPY, b: 2, c: 2, m: "Immediate" };
instructions[0xc4] = { i: CPY, b: 2, c: 3, m: "ZeroPage" };
instructions[0xcc] = { i: CPY, b: 3, c: 4, m: "Absolute" };

instructions[0x18] = { i: CLC, b: 1, c: 2, m: "Implied" };
instructions[0x58] = { i: CLI, b: 1, c: 2, m: "Implied" };
instructions[0xb8] = { i: CLV, b: 1, c: 2, m: "Implied" };
instructions[0x38] = { i: SEC, b: 1, c: 2, m: "Implied" };
instructions[0x78] = { i: SEI, b: 1, c: 2, m: "Implied" };
instructions[0xf8] = { i: SED, b: 1, c: 2, m: "Implied" };
instructions[0xd8] = { i: CLD, b: 1, c: 2, m: "Implied" };

// eslint-disable-next-line no-undef
instructions[0xba] = { i: TSX, b: 1, c: 2, m: "Implied" };
instructions[0x9a] = { i: TXS, b: 1, c: 2, m: "Implied" };
instructions[0x48] = { i: PHA, b: 1, c: 3, m: "Implied" };
instructions[0x08] = { i: PHP, b: 1, c: 3, m: "Implied" };
instructions[0x68] = { i: PLA, b: 1, c: 4, m: "Implied" };
instructions[0x28] = { i: PLP, b: 1, c: 4, m: "Implied" };

instructions[0x29] = { i: AND, b: 2, c: 2, m: "Immediate" };
instructions[0x25] = { i: AND, b: 2, c: 3, m: "ZeroPage" };
instructions[0x35] = { i: AND, b: 2, c: 4, m: "ZeroPageX" };
instructions[0x2d] = { i: AND, b: 3, c: 4, m: "Absolute" };
instructions[0x3d] = { i: AND, b: 3, c: 4, m: "AbsoluteX" };
instructions[0x39] = { i: AND, b: 3, c: 4, m: "AbsoluteY" };
instructions[0x21] = { i: AND, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0x31] = { i: AND, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0x49] = { i: EOR, b: 2, c: 2, m: "Immediate" };
instructions[0x45] = { i: EOR, b: 2, c: 3, m: "ZeroPage" };
instructions[0x55] = { i: EOR, b: 2, c: 4, m: "ZeroPageX" };
instructions[0x4d] = { i: EOR, b: 3, c: 4, m: "Absolute" };
instructions[0x5d] = { i: EOR, b: 3, c: 4, m: "AbsoluteX" };
instructions[0x59] = { i: EOR, b: 3, c: 4, m: "AbsoluteY" };
instructions[0x41] = { i: EOR, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0x51] = { i: EOR, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0x09] = { i: ORA, b: 2, c: 2, m: "Immediate" };
instructions[0x05] = { i: ORA, b: 2, c: 3, m: "ZeroPage" };
instructions[0x15] = { i: ORA, b: 2, c: 4, m: "ZeroPageX" };
instructions[0x0d] = { i: ORA, b: 3, c: 4, m: "Absolute" };
instructions[0x1d] = { i: ORA, b: 3, c: 4, m: "AbsoluteX" };
instructions[0x19] = { i: ORA, b: 3, c: 4, m: "AbsoluteY" };
instructions[0x01] = { i: ORA, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0x11] = { i: ORA, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0x24] = { i: BIT, b: 2, c: 3, m: "ZeroPage" };
instructions[0x2c] = { i: BIT, b: 3, c: 4, m: "Absolute" };

instructions[0xc9] = { i: CMP, b: 2, c: 2, m: "Immediate" };
instructions[0xc5] = { i: CMP, b: 2, c: 3, m: "ZeroPage" };
instructions[0xd5] = { i: CMP, b: 2, c: 4, m: "ZeroPageX" };
instructions[0xcd] = { i: CMP, b: 3, c: 4, m: "Absolute" };
instructions[0xdd] = { i: CMP, b: 3, c: 4, m: "AbsoluteX" };
instructions[0xd9] = { i: CMP, b: 3, c: 4, m: "AbsoluteY" };
instructions[0xc1] = { i: CMP, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0xd1] = { i: CMP, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0x0a] = { i: ASL, b: 1, c: 2, m: "Accumulator" };
instructions[0x06] = { i: ASL, b: 2, c: 5, m: "ZeroPage" };
instructions[0x16] = { i: ASL, b: 2, c: 6, m: "ZeroPageX" };
instructions[0x0e] = { i: ASL, b: 3, c: 6, m: "Absolute" };
instructions[0x1e] = { i: ASL, b: 3, c: 7, m: "AbsoluteX" };

instructions[0x4a] = { i: LSR, b: 1, c: 2, m: "Accumulator" };
instructions[0x46] = { i: LSR, b: 2, c: 5, m: "ZeroPage" };
instructions[0x56] = { i: LSR, b: 2, c: 6, m: "ZeroPageX" };
instructions[0x4e] = { i: LSR, b: 3, c: 6, m: "Absolute" };
instructions[0x5e] = { i: LSR, b: 3, c: 7, m: "AbsoluteX" };

instructions[0x2a] = { i: ROL, b: 1, c: 2, m: "Accumulator" };
instructions[0x26] = { i: ROL, b: 2, c: 5, m: "ZeroPage" };
instructions[0x36] = { i: ROL, b: 2, c: 6, m: "ZeroPageX" };
instructions[0x2e] = { i: ROL, b: 3, c: 6, m: "Absolute" };
instructions[0x3e] = { i: ROL, b: 3, c: 7, m: "AbsoluteX" };

instructions[0x6a] = { i: ROR, b: 1, c: 2, m: "Accumulator" };
instructions[0x66] = { i: ROR, b: 2, c: 5, m: "ZeroPage" };
instructions[0x76] = { i: ROR, b: 2, c: 6, m: "ZeroPageX" };
instructions[0x6e] = { i: ROR, b: 3, c: 6, m: "Absolute" };
instructions[0x7e] = { i: ROR, b: 3, c: 7, m: "AbsoluteX" };

instructions[0x4c] = { i: JMP, b: 3, c: 3, m: "Absolute" };
instructions[0x6c] = { i: JMP, b: 3, c: 5, m: "Indirect" };

instructions[0x20] = { i: JSR, b: 3, c: 6, m: "Absolute" };
instructions[0x60] = { i: RTS, b: 1, c: 6, m: "Implied" };

instructions[0x69] = { i: ADC, b: 2, c: 2, m: "Immediate" };
instructions[0x65] = { i: ADC, b: 2, c: 3, m: "ZeroPage" };
instructions[0x75] = { i: ADC, b: 2, c: 4, m: "ZeroPageX" };
instructions[0x6d] = { i: ADC, b: 3, c: 4, m: "Absolute" };
instructions[0x7d] = { i: ADC, b: 3, c: 4, m: "AbsoluteX" };
instructions[0x79] = { i: ADC, b: 3, c: 4, m: "AbsoluteY" };
instructions[0x61] = { i: ADC, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0x71] = { i: ADC, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0xe9] = { i: SBC, b: 2, c: 2, m: "Immediate" };
instructions[0xe5] = { i: SBC, b: 2, c: 3, m: "ZeroPage" };
instructions[0xf5] = { i: SBC, b: 2, c: 4, m: "ZeroPageX" };
instructions[0xed] = { i: SBC, b: 3, c: 4, m: "Absolute" };
instructions[0xfd] = { i: SBC, b: 3, c: 4, m: "AbsoluteX" };
instructions[0xf9] = { i: SBC, b: 3, c: 4, m: "AbsoluteY" };
instructions[0xe1] = { i: SBC, b: 2, c: 6, m: "IndexedIndirect" };
instructions[0xf1] = { i: SBC, b: 2, c: 5, m: "IndirectIndexed" };

instructions[0xea] = { i: NOP, b: 1, c: 2, m: "Implied" };
instructions[0x00] = { i: BRK, b: 1, c: 7, m: "Implied" };
instructions[0x40] = { i: RTI, b: 1, c: 6, m: "Implied" };
export default instructions;
