export const lifeNftAbi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [{ internalType: 'address', name: 'operator', type: 'address' }],
        name: 'OperatorNotAllowed',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'approved', type: 'address' },
            { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
            { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'ApprovalForAll',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: '_fromTokenId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: '_toTokenId', type: 'uint256' },
        ],
        name: 'BatchMetadataUpdate',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
        name: 'MetadataUpdate',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
            { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' },
        ],
        name: 'RoleAdminChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        ],
        name: 'RoleGranted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        ],
        name: 'RoleRevoked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' },
            { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'operator', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'baseURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'contractURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
        name: 'getRoleAdmin',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getVersion',
        outputs: [{ internalType: 'string', name: 'version', type: 'string' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'hasRole',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'hasSetBaseURI',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address[]', name: 'admins', type: 'address[]' },
            {
                components: [
                    { internalType: 'address', name: 'paymentsRecipient', type: 'address' },
                    { internalType: 'address', name: 'primaryRoyaltyRecipient', type: 'address' },
                    { internalType: 'uint256', name: 'price', type: 'uint256' },
                    { internalType: 'uint256', name: 'supplyLimit', type: 'uint256' },
                    { internalType: 'uint256', name: 'royaltyBps', type: 'uint256' },
                    { internalType: 'string', name: 'name', type: 'string' },
                    { internalType: 'string', name: 'symbol', type: 'string' },
                    { internalType: 'string', name: 'baseURI', type: 'string' },
                    { internalType: 'bool', name: 'transferable', type: 'bool' },
                    { internalType: 'bool', name: 'openseaFilterEnabled', type: 'bool' },
                    { internalType: 'string', name: 'contractURI', type: 'string' },
                ],
                internalType: 'struct IUpgradeable721.CollectionParams',
                name: 'params',
                type: 'tuple',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }],
        name: 'mintTo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'recipient', type: 'address' },
            { internalType: 'string', name: 'customTokenURI', type: 'string' },
        ],
        name: 'mintToWithURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'openseaFilterEnabled',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paymentsEnabled',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paymentsRecipient',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'price',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'primaryRoyaltyRecipient',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'recipient', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'publicMint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'royaltyBps',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'salePrice', type: 'uint256' },
        ],
        name: 'royaltyInfo',
        outputs: [
            { internalType: 'address', name: 'receiver', type: 'address' },
            { internalType: 'uint256', name: 'royaltyAmount', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'operator', type: 'address' },
            { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string', name: 'baseURI_', type: 'string' }],
        name: 'setBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string', name: 'contractURI_', type: 'string' }],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string', name: 'name_', type: 'string' }],
        name: 'setName',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bool', name: 'enabled', type: 'bool' }],
        name: 'setOpenseaFilterEnabled',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'paymentsRecipient_', type: 'address' }],
        name: 'setPaymentsRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'price_', type: 'uint256' }],
        name: 'setPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'primaryRoyaltyRecipient_', type: 'address' },
            { internalType: 'uint256', name: 'royaltyBps_', type: 'uint256' },
        ],
        name: 'setRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'supplyLimit_', type: 'uint256' }],
        name: 'setSupplyLimit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string', name: 'symbol_', type: 'string' }],
        name: 'setSymbol',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI_', type: 'string' },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bool', name: 'value', type: 'bool' }],
        name: 'setTransferable',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'supplyLimit',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'transferable',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'paymentsRecipient_', type: 'address' },
            { internalType: 'uint256', name: 'price_', type: 'uint256' },
            { internalType: 'uint256', name: 'supplyLimit_', type: 'uint256' },
        ],
        name: 'updatePaymentsParams',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

export const smartWalletAbi = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'target', type: 'address' },
            { indexed: true, internalType: 'uint256', name: 'value', type: 'uint256' },
            { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        name: 'TransactionExecuted',
        type: 'event',
    },
    {
        inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        name: 'executeCall',
        outputs: [{ internalType: 'bytes', name: 'result', type: 'bytes' }],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'hasNFTsMetadata',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes32', name: 'hash', type: 'bytes32' },
            { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        name: 'isValidSignature',
        outputs: [{ internalType: 'bytes4', name: 'magicValue', type: 'bytes4' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'nonce',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [],
        name: 'token',
        outputs: [
            { internalType: 'uint256', name: '', type: 'uint256' },
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
];

export const characterNftAbi = [
    {
        type: 'constructor',
        name: '',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'error',
        name: 'ApprovalCallerNotOwnerNorApproved',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'ApprovalQueryForNonexistentToken',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'ApprovalToCurrentOwner',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'ApproveToCaller',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'BalanceQueryForZeroAddress',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'MintToZeroAddress',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'MintZeroQuantity',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'OwnerQueryForNonexistentToken',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'TransferCallerNotOwnerNorApproved',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'TransferFromIncorrectOwner',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'TransferToNonERC721ReceiverImplementer',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'TransferToZeroAddress',
        inputs: [],
        outputs: [],
    },
    {
        type: 'error',
        name: 'URIQueryForNonexistentToken',
        inputs: [],
        outputs: [],
    },
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'approved',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'tokenId',
                indexed: true,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'ApprovalForAll',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'operator',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'bool',
                name: 'approved',
                indexed: false,
                internalType: 'bool',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'BatchMetadataUpdate',
        inputs: [
            {
                type: 'uint256',
                name: '_fromTokenId',
                indexed: false,
                internalType: 'uint256',
            },
            {
                type: 'uint256',
                name: '_toTokenId',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'ClaimConditionsUpdated',
        inputs: [
            {
                type: 'tuple[]',
                name: 'claimConditions',
                components: [
                    {
                        type: 'uint256',
                        name: 'startTimestamp',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'maxClaimableSupply',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'supplyClaimed',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'quantityLimitPerWallet',
                        internalType: 'uint256',
                    },
                    {
                        type: 'bytes32',
                        name: 'merkleRoot',
                        internalType: 'bytes32',
                    },
                    {
                        type: 'uint256',
                        name: 'pricePerToken',
                        internalType: 'uint256',
                    },
                    {
                        type: 'address',
                        name: 'currency',
                        internalType: 'address',
                    },
                    {
                        type: 'string',
                        name: 'metadata',
                        internalType: 'string',
                    },
                ],
                indexed: false,
                internalType: 'struct IClaimCondition.ClaimCondition[]',
            },
            {
                type: 'bool',
                name: 'resetEligibility',
                indexed: false,
                internalType: 'bool',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'ContractURIUpdated',
        inputs: [
            {
                type: 'string',
                name: 'prevURI',
                indexed: false,
                internalType: 'string',
            },
            {
                type: 'string',
                name: 'newURI',
                indexed: false,
                internalType: 'string',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'DefaultRoyalty',
        inputs: [
            {
                type: 'address',
                name: 'newRoyaltyRecipient',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'newRoyaltyBps',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'FlatPlatformFeeUpdated',
        inputs: [
            {
                type: 'address',
                name: 'platformFeeRecipient',
                indexed: false,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'flatFee',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Initialized',
        inputs: [
            {
                type: 'uint8',
                name: 'version',
                indexed: false,
                internalType: 'uint8',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'MaxTotalSupplyUpdated',
        inputs: [
            {
                type: 'uint256',
                name: 'maxTotalSupply',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'MetadataFrozen',
        inputs: [],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'OwnerUpdated',
        inputs: [
            {
                type: 'address',
                name: 'prevOwner',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'newOwner',
                indexed: true,
                internalType: 'address',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'PlatformFeeInfoUpdated',
        inputs: [
            {
                type: 'address',
                name: 'platformFeeRecipient',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'platformFeeBps',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'PlatformFeeTypeUpdated',
        inputs: [
            {
                type: 'uint8',
                name: 'feeType',
                indexed: false,
                internalType: 'enum IPlatformFee.PlatformFeeType',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'PrimarySaleRecipientUpdated',
        inputs: [
            {
                type: 'address',
                name: 'recipient',
                indexed: true,
                internalType: 'address',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoleAdminChanged',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                indexed: true,
                internalType: 'bytes32',
            },
            {
                type: 'bytes32',
                name: 'previousAdminRole',
                indexed: true,
                internalType: 'bytes32',
            },
            {
                type: 'bytes32',
                name: 'newAdminRole',
                indexed: true,
                internalType: 'bytes32',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoleGranted',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                indexed: true,
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'sender',
                indexed: true,
                internalType: 'address',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoleRevoked',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                indexed: true,
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'sender',
                indexed: true,
                internalType: 'address',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoyaltyForToken',
        inputs: [
            {
                type: 'uint256',
                name: 'tokenId',
                indexed: true,
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: 'royaltyRecipient',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'royaltyBps',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'TokenURIRevealed',
        inputs: [
            {
                type: 'uint256',
                name: 'index',
                indexed: true,
                internalType: 'uint256',
            },
            {
                type: 'string',
                name: 'revealedURI',
                indexed: false,
                internalType: 'string',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'TokensClaimed',
        inputs: [
            {
                type: 'uint256',
                name: 'claimConditionIndex',
                indexed: true,
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: 'claimer',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'receiver',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'startTokenId',
                indexed: false,
                internalType: 'uint256',
            },
            {
                type: 'uint256',
                name: 'quantityClaimed',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'TokensLazyMinted',
        inputs: [
            {
                type: 'uint256',
                name: 'startTokenId',
                indexed: true,
                internalType: 'uint256',
            },
            {
                type: 'uint256',
                name: 'endTokenId',
                indexed: false,
                internalType: 'uint256',
            },
            {
                type: 'string',
                name: 'baseURI',
                indexed: false,
                internalType: 'string',
            },
            {
                type: 'bytes',
                name: 'encryptedBaseURI',
                indexed: false,
                internalType: 'bytes',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                type: 'address',
                name: 'from',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'to',
                indexed: true,
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'tokenId',
                indexed: true,
                internalType: 'uint256',
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: 'function',
        name: 'DEFAULT_ADMIN_ROLE',
        inputs: [],
        outputs: [
            {
                type: 'bytes32',
                name: '',
                internalType: 'bytes32',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'approve',
        inputs: [
            {
                type: 'address',
                name: 'to',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'balanceOf',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'batchFrozen',
        inputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'burn',
        inputs: [
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'claim',
        inputs: [
            {
                type: 'address',
                name: '_receiver',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_quantity',
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: '_currency',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_pricePerToken',
                internalType: 'uint256',
            },
            {
                type: 'tuple',
                name: '_allowlistProof',
                components: [
                    {
                        type: 'bytes32[]',
                        name: 'proof',
                        internalType: 'bytes32[]',
                    },
                    {
                        type: 'uint256',
                        name: 'quantityLimitPerWallet',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'pricePerToken',
                        internalType: 'uint256',
                    },
                    {
                        type: 'address',
                        name: 'currency',
                        internalType: 'address',
                    },
                ],
                internalType: 'struct IDrop.AllowlistProof',
            },
            {
                type: 'bytes',
                name: '_data',
                internalType: 'bytes',
            },
        ],
        outputs: [],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'claimCondition',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: 'currentStartId',
                internalType: 'uint256',
            },
            {
                type: 'uint256',
                name: 'count',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'contractType',
        inputs: [],
        outputs: [
            {
                type: 'bytes32',
                name: '',
                internalType: 'bytes32',
            },
        ],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'contractURI',
        inputs: [],
        outputs: [
            {
                type: 'string',
                name: '',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'contractVersion',
        inputs: [],
        outputs: [
            {
                type: 'uint8',
                name: '',
                internalType: 'uint8',
            },
        ],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'encryptDecrypt',
        inputs: [
            {
                type: 'bytes',
                name: 'data',
                internalType: 'bytes',
            },
            {
                type: 'bytes',
                name: 'key',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                type: 'bytes',
                name: 'result',
                internalType: 'bytes',
            },
        ],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'encryptedData',
        inputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bytes',
                name: '',
                internalType: 'bytes',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'freezeBatchBaseURI',
        inputs: [
            {
                type: 'uint256',
                name: '_index',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'getActiveClaimConditionId',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getApproved',
        inputs: [
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getBaseURICount',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getBatchIdAtIndex',
        inputs: [
            {
                type: 'uint256',
                name: '_index',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getClaimConditionById',
        inputs: [
            {
                type: 'uint256',
                name: '_conditionId',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'tuple',
                name: 'condition',
                components: [
                    {
                        type: 'uint256',
                        name: 'startTimestamp',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'maxClaimableSupply',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'supplyClaimed',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'quantityLimitPerWallet',
                        internalType: 'uint256',
                    },
                    {
                        type: 'bytes32',
                        name: 'merkleRoot',
                        internalType: 'bytes32',
                    },
                    {
                        type: 'uint256',
                        name: 'pricePerToken',
                        internalType: 'uint256',
                    },
                    {
                        type: 'address',
                        name: 'currency',
                        internalType: 'address',
                    },
                    {
                        type: 'string',
                        name: 'metadata',
                        internalType: 'string',
                    },
                ],
                internalType: 'struct IClaimCondition.ClaimCondition',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getDefaultRoyaltyInfo',
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
            {
                type: 'uint16',
                name: '',
                internalType: 'uint16',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getFlatPlatformFeeInfo',
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPlatformFeeInfo',
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
            {
                type: 'uint16',
                name: '',
                internalType: 'uint16',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPlatformFeeType',
        inputs: [],
        outputs: [
            {
                type: 'uint8',
                name: '',
                internalType: 'enum IPlatformFee.PlatformFeeType',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRevealURI',
        inputs: [
            {
                type: 'uint256',
                name: '_batchId',
                internalType: 'uint256',
            },
            {
                type: 'bytes',
                name: '_key',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                type: 'string',
                name: 'revealedURI',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoleAdmin',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
        ],
        outputs: [
            {
                type: 'bytes32',
                name: '',
                internalType: 'bytes32',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoleMember',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
            {
                type: 'uint256',
                name: 'index',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: 'member',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoleMemberCount',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: 'count',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoyaltyInfoForToken',
        inputs: [
            {
                type: 'uint256',
                name: '_tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
            {
                type: 'uint16',
                name: '',
                internalType: 'uint16',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getSupplyClaimedByWallet',
        inputs: [
            {
                type: 'uint256',
                name: '_conditionId',
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: '_claimer',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: 'supplyClaimedByWallet',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'grantRole',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'hasRole',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'hasRoleWithSwitch',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'initialize',
        inputs: [
            {
                type: 'address',
                name: '_defaultAdmin',
                internalType: 'address',
            },
            {
                type: 'string',
                name: '_name',
                internalType: 'string',
            },
            {
                type: 'string',
                name: '_symbol',
                internalType: 'string',
            },
            {
                type: 'string',
                name: '_contractURI',
                internalType: 'string',
            },
            {
                type: 'address[]',
                name: '_trustedForwarders',
                internalType: 'address[]',
            },
            {
                type: 'address',
                name: '_saleRecipient',
                internalType: 'address',
            },
            {
                type: 'address',
                name: '_royaltyRecipient',
                internalType: 'address',
            },
            {
                type: 'uint128',
                name: '_royaltyBps',
                internalType: 'uint128',
            },
            {
                type: 'uint128',
                name: '_platformFeeBps',
                internalType: 'uint128',
            },
            {
                type: 'address',
                name: '_platformFeeRecipient',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'isApprovedForAll',
        inputs: [
            {
                type: 'address',
                name: 'owner',
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'operator',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'isEncryptedBatch',
        inputs: [
            {
                type: 'uint256',
                name: '_batchId',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'isTrustedForwarder',
        inputs: [
            {
                type: 'address',
                name: 'forwarder',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'lazyMint',
        inputs: [
            {
                type: 'uint256',
                name: '_amount',
                internalType: 'uint256',
            },
            {
                type: 'string',
                name: '_baseURIForTokens',
                internalType: 'string',
            },
            {
                type: 'bytes',
                name: '_data',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                type: 'uint256',
                name: 'batchId',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'maxTotalSupply',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'multicall',
        inputs: [
            {
                type: 'bytes[]',
                name: 'data',
                internalType: 'bytes[]',
            },
        ],
        outputs: [
            {
                type: 'bytes[]',
                name: 'results',
                internalType: 'bytes[]',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'name',
        inputs: [],
        outputs: [
            {
                type: 'string',
                name: '',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'nextTokenIdToClaim',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'nextTokenIdToMint',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'owner',
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'ownerOf',
        inputs: [
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'primarySaleRecipient',
        inputs: [],
        outputs: [
            {
                type: 'address',
                name: '',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'renounceRole',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'reveal',
        inputs: [
            {
                type: 'uint256',
                name: '_index',
                internalType: 'uint256',
            },
            {
                type: 'bytes',
                name: '_key',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                type: 'string',
                name: 'revealedURI',
                internalType: 'string',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'revokeRole',
        inputs: [
            {
                type: 'bytes32',
                name: 'role',
                internalType: 'bytes32',
            },
            {
                type: 'address',
                name: 'account',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'royaltyInfo',
        inputs: [
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
            {
                type: 'uint256',
                name: 'salePrice',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: 'receiver',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'royaltyAmount',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'safeTransferFrom',
        inputs: [
            {
                type: 'address',
                name: 'from',
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'to',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'safeTransferFrom',
        inputs: [
            {
                type: 'address',
                name: 'from',
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'to',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
            {
                type: 'bytes',
                name: '_data',
                internalType: 'bytes',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setApprovalForAll',
        inputs: [
            {
                type: 'address',
                name: 'operator',
                internalType: 'address',
            },
            {
                type: 'bool',
                name: 'approved',
                internalType: 'bool',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setClaimConditions',
        inputs: [
            {
                type: 'tuple[]',
                name: '_conditions',
                components: [
                    {
                        type: 'uint256',
                        name: 'startTimestamp',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'maxClaimableSupply',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'supplyClaimed',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'quantityLimitPerWallet',
                        internalType: 'uint256',
                    },
                    {
                        type: 'bytes32',
                        name: 'merkleRoot',
                        internalType: 'bytes32',
                    },
                    {
                        type: 'uint256',
                        name: 'pricePerToken',
                        internalType: 'uint256',
                    },
                    {
                        type: 'address',
                        name: 'currency',
                        internalType: 'address',
                    },
                    {
                        type: 'string',
                        name: 'metadata',
                        internalType: 'string',
                    },
                ],
                internalType: 'struct IClaimCondition.ClaimCondition[]',
            },
            {
                type: 'bool',
                name: '_resetClaimEligibility',
                internalType: 'bool',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setContractURI',
        inputs: [
            {
                type: 'string',
                name: '_uri',
                internalType: 'string',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setDefaultRoyaltyInfo',
        inputs: [
            {
                type: 'address',
                name: '_royaltyRecipient',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_royaltyBps',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setFlatPlatformFeeInfo',
        inputs: [
            {
                type: 'address',
                name: '_platformFeeRecipient',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_flatFee',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setMaxTotalSupply',
        inputs: [
            {
                type: 'uint256',
                name: '_maxTotalSupply',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setOwner',
        inputs: [
            {
                type: 'address',
                name: '_newOwner',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setPlatformFeeInfo',
        inputs: [
            {
                type: 'address',
                name: '_platformFeeRecipient',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_platformFeeBps',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setPlatformFeeType',
        inputs: [
            {
                type: 'uint8',
                name: '_feeType',
                internalType: 'enum IPlatformFee.PlatformFeeType',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setPrimarySaleRecipient',
        inputs: [
            {
                type: 'address',
                name: '_saleRecipient',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setRoyaltyInfoForToken',
        inputs: [
            {
                type: 'uint256',
                name: '_tokenId',
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: '_recipient',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_bps',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'supportsInterface',
        inputs: [
            {
                type: 'bytes4',
                name: 'interfaceId',
                internalType: 'bytes4',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: '',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'symbol',
        inputs: [],
        outputs: [
            {
                type: 'string',
                name: '',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'tokenURI',
        inputs: [
            {
                type: 'uint256',
                name: '_tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'string',
                name: '',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'totalMinted',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'totalSupply',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
                name: '',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'transferFrom',
        inputs: [
            {
                type: 'address',
                name: 'from',
                internalType: 'address',
            },
            {
                type: 'address',
                name: 'to',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: 'tokenId',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'updateBatchBaseURI',
        inputs: [
            {
                type: 'uint256',
                name: '_index',
                internalType: 'uint256',
            },
            {
                type: 'string',
                name: '_uri',
                internalType: 'string',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'verifyClaim',
        inputs: [
            {
                type: 'uint256',
                name: '_conditionId',
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: '_claimer',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_quantity',
                internalType: 'uint256',
            },
            {
                type: 'address',
                name: '_currency',
                internalType: 'address',
            },
            {
                type: 'uint256',
                name: '_pricePerToken',
                internalType: 'uint256',
            },
            {
                type: 'tuple',
                name: '_allowlistProof',
                components: [
                    {
                        type: 'bytes32[]',
                        name: 'proof',
                        internalType: 'bytes32[]',
                    },
                    {
                        type: 'uint256',
                        name: 'quantityLimitPerWallet',
                        internalType: 'uint256',
                    },
                    {
                        type: 'uint256',
                        name: 'pricePerToken',
                        internalType: 'uint256',
                    },
                    {
                        type: 'address',
                        name: 'currency',
                        internalType: 'address',
                    },
                ],
                internalType: 'struct IDrop.AllowlistProof',
            },
        ],
        outputs: [
            {
                type: 'bool',
                name: 'isOverride',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
];
