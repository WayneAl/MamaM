export type Mamam = {
  "version": "0.0.0",
  "name": "mamam",
  "instructions": [
    {
      "name": "initializeExchange",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinMintPk",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcMintPk",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "coinVaultPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVaultPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bidsPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asksPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reqQPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumDexProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultSignerNonce",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initUserOnMarket",
      "accounts": [
        {
          "name": "exchange",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumDexProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "placeOrder",
      "accounts": [
        {
          "name": "exchange",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "orderPayer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumDexProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "side",
          "type": "u8"
        },
        {
          "name": "limit",
          "type": "u64"
        },
        {
          "name": "maxCoinQty",
          "type": "u64"
        },
        {
          "name": "maxPcQty",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeAmm",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "length",
          "type": "u64"
        },
        {
          "name": "timeGranularity",
          "type": "u64"
        },
        {
          "name": "range",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositAmm",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userToken1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userToken2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "value1",
          "type": "u64"
        },
        {
          "name": "value2",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumDexProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "exchange",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "markets",
            "type": {
              "vec": {
                "defined": "MarketData"
              }
            }
          },
          {
            "name": "amms",
            "type": {
              "vec": {
                "defined": "AmmData"
              }
            }
          }
        ]
      }
    },
    {
      "name": "amm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketData",
            "type": {
              "defined": "MarketData"
            }
          },
          {
            "name": "market",
            "type": "publicKey"
          },
          {
            "name": "pairName",
            "type": "string"
          },
          {
            "name": "asset1",
            "type": {
              "defined": "AssetData"
            }
          },
          {
            "name": "asset2",
            "type": {
              "defined": "AssetData"
            }
          },
          {
            "name": "vault1",
            "type": "publicKey"
          },
          {
            "name": "vault2",
            "type": "publicKey"
          },
          {
            "name": "ema",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "length",
            "type": "u64"
          },
          {
            "name": "timeGranularity",
            "type": "u64"
          },
          {
            "name": "range",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SerumData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "coinLotSize",
            "type": "u64"
          },
          {
            "name": "pcLotSize",
            "type": "u64"
          },
          {
            "name": "vaultSignerNonce",
            "type": "u64"
          },
          {
            "name": "pcDustThreshold",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AmmData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "marketAddress",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "MarketData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "pairName",
            "type": "string"
          },
          {
            "name": "asset1",
            "type": {
              "defined": "AssetData"
            }
          },
          {
            "name": "asset2",
            "type": {
              "defined": "AssetData"
            }
          }
        ]
      }
    },
    {
      "name": "AssetData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "symbol",
            "type": {
              "defined": "Symbol"
            }
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "spotOracle",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "SampleError"
          }
        ]
      }
    },
    {
      "name": "Symbol",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "BTC"
          },
          {
            "name": "ETH"
          },
          {
            "name": "USDC"
          }
        ]
      }
    }
  ]
};

export const IDL: Mamam = {
  "version": "0.0.0",
  "name": "mamam",
  "instructions": [
    {
      "name": "initializeExchange",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinMintPk",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcMintPk",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "coinVaultPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVaultPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bidsPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asksPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reqQPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQPk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumDexProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultSignerNonce",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initUserOnMarket",
      "accounts": [
        {
          "name": "exchange",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumDexProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "placeOrder",
      "accounts": [
        {
          "name": "exchange",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "orderPayer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumDexProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "side",
          "type": "u8"
        },
        {
          "name": "limit",
          "type": "u64"
        },
        {
          "name": "maxCoinQty",
          "type": "u64"
        },
        {
          "name": "maxPcQty",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeAmm",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "length",
          "type": "u64"
        },
        {
          "name": "timeGranularity",
          "type": "u64"
        },
        {
          "name": "range",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositAmm",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userToken1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userToken2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "value1",
          "type": "u64"
        },
        {
          "name": "value2",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "exchange",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle1",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle2",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumDexProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "exchange",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "markets",
            "type": {
              "vec": {
                "defined": "MarketData"
              }
            }
          },
          {
            "name": "amms",
            "type": {
              "vec": {
                "defined": "AmmData"
              }
            }
          }
        ]
      }
    },
    {
      "name": "amm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketData",
            "type": {
              "defined": "MarketData"
            }
          },
          {
            "name": "market",
            "type": "publicKey"
          },
          {
            "name": "pairName",
            "type": "string"
          },
          {
            "name": "asset1",
            "type": {
              "defined": "AssetData"
            }
          },
          {
            "name": "asset2",
            "type": {
              "defined": "AssetData"
            }
          },
          {
            "name": "vault1",
            "type": "publicKey"
          },
          {
            "name": "vault2",
            "type": "publicKey"
          },
          {
            "name": "ema",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "length",
            "type": "u64"
          },
          {
            "name": "timeGranularity",
            "type": "u64"
          },
          {
            "name": "range",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SerumData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "coinLotSize",
            "type": "u64"
          },
          {
            "name": "pcLotSize",
            "type": "u64"
          },
          {
            "name": "vaultSignerNonce",
            "type": "u64"
          },
          {
            "name": "pcDustThreshold",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AmmData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "marketAddress",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "MarketData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "pairName",
            "type": "string"
          },
          {
            "name": "asset1",
            "type": {
              "defined": "AssetData"
            }
          },
          {
            "name": "asset2",
            "type": {
              "defined": "AssetData"
            }
          }
        ]
      }
    },
    {
      "name": "AssetData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "symbol",
            "type": {
              "defined": "Symbol"
            }
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "spotOracle",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "SampleError"
          }
        ]
      }
    },
    {
      "name": "Symbol",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "BTC"
          },
          {
            "name": "ETH"
          },
          {
            "name": "USDC"
          }
        ]
      }
    }
  ]
};
