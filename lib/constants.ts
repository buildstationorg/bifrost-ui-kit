import { Token } from "@/types/token";

export const L2SLPX_CONTRACT_ADDRESS = "0x262e52beD191a441CBD28dB151A11D7c41384F72"

export const L2SLPX_CONTRACT_ADDRESSES = [
  {
    network: "sepolia",
    address: "0x262e52beD191a441CBD28dB151A11D7c41384F72",
  },
  {
    network: "arbitrum-sepolia",
    address: "0x62CA64454046BbC18e35066A6350Acb0378EB3c2",
  },
  {
    network: "base-sepolia",
    address: "0x262e52beD191a441CBD28dB151A11D7c41384F72",
  },
  {
    network: "bsc-testnet",
    address: "0xC4F238cEdC1f77A0Fe36F60eceDef14336e4eFbe",
  },
  {
    network: "unichain-sepolia",
    address: "0x85bb6d27571C3175c81fe212c0decCA2202147b9",
  },
  {
    network: "westend-assethub",
    address: "0x80aC520A989388D6757f9049d3875256696D5076",
  }
]

export const YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS = "0xa0C9789F449E4525b21647c67FEFeD121b73ef5d"

export const TOKEN_LIST: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //https://eips.ethereum.org/EIPS/eip-7528
    network: "sepolia",
    decimals: 18,
    image: "/eth.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    address: "0x4B16E254E7848e0826eBDd3049474fD9E70A244c",
    network: "sepolia",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Voucher ETH",
    symbol: "vETH",
    address: "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC",
    network: "sepolia",
    decimals: 18,
    image: "/veth.svg",
  },
  {
    name: "Voucher DOT",
    symbol: "vDOT",
    address: "0x8bFA30329F2A7A7b72fa4A76FdcE8aC92284bb94",
    network: "sepolia",
    decimals: 18,
    image: "/vdot.svg",
  },
];


export const TOKEN_LIST3: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //https://eips.ethereum.org/EIPS/eip-7528
    network: "sepolia",
    decimals: 18,
    image: "/eth.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    address: "0x4B16E254E7848e0826eBDd3049474fD9E70A244c",
    network: "sepolia",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Voucher ETH",
    symbol: "vETH",
    address: "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC",
    network: "sepolia",
    decimals: 18,
    image: "/veth.svg",
  },
  {
    name: "Voucher DOT",
    symbol: "vDOT",
    address: "0x8bFA30329F2A7A7b72fa4A76FdcE8aC92284bb94",
    network: "sepolia",
    decimals: 18,
    image: "/vdot.svg",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //https://eips.ethereum.org/EIPS/eip-7528
    network: "base-sepolia",
    decimals: 18,
    image: "/eth.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    address: "0x4B16E254E7848e0826eBDd3049474fD9E70A244c",
    network: "base-sepolia",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Voucher ETH",
    symbol: "vETH",
    address: "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC",
    network: "base-sepolia",
    decimals: 18,
    image: "/veth.svg",
  },
  {
    name: "Voucher DOT",
    symbol: "vDOT",
    address: "0x8bFA30329F2A7A7b72fa4A76FdcE8aC92284bb94",
    network: "base-sepolia",
    decimals: 18,
    image: "/vdot.svg",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //https://eips.ethereum.org/EIPS/eip-7528
    network: "arbitrum-sepolia",
    decimals: 18,
    image: "/eth.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    address: "0x4B16E254E7848e0826eBDd3049474fD9E70A244c",
    network: "arbitrum-sepolia",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Voucher ETH",
    symbol: "vETH",
    address: "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC",
    network: "arbitrum-sepolia",
    decimals: 18,
    image: "/veth.svg",
  },
  {
    name: "Voucher DOT",
    symbol: "vDOT",
    address: "0x8bFA30329F2A7A7b72fa4A76FdcE8aC92284bb94",
    network: "arbitrum-sepolia",
    decimals: 18,
    image: "/vdot.svg",
  },
  {
    name: "Westend",
    symbol: "WND",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //https://eips.ethereum.org/EIPS/eip-7528
    network: "westend-assethub",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    address: "0xCa8d2C658EB4833647202FE5a431cD52aF5812E2",
    network: "westend-assethub",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Voucher DOT",
    symbol: "vDOT",
    address: "0x4565B7a881396F38dfF8e28830a0b614e3baC422",
    network: "westend-assethub",
    decimals: 18,
    image: "/vdot.svg",
  },
]

export const TOKEN_LIST2: Token[] = [
  {
    name: "Westend",
    symbol: "WND",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //https://eips.ethereum.org/EIPS/eip-7528
    network: "westend-assethub",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    address: "0xCa8d2C658EB4833647202FE5a431cD52aF5812E2",
    network: "westend-assethub",
    decimals: 18,
    image: "/dot.svg",
  },
  {
    name: "Voucher DOT",
    symbol: "vDOT",
    address: "0x4565B7a881396F38dfF8e28830a0b614e3baC422",
    network: "westend-assethub",
    decimals: 18,
    image: "/vdot.svg",
  },
];