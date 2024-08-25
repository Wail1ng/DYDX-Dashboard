export type BalanceData = {
  balance: {
    amount: number;
    denom: string;
  };
};

export type AllBalanceData = {
  balances: {
    denom: string;
    amount: string;
  }[];
  pagination: {
    next_key: string;
    total: string;
  };
};

export type AddressWallet = {
  address: string;
};

export type StakingData = {
  delegation_responses: Delegation[];
  staked?: {
    totalStaked: number;
    validators: Validator[];
  };
};

export type Delegation = {
  balance: {
    amount: string;
  };
  delegation: {
    validator_address: string;
  };
};

export type Validator = {
  validatorAddress: string;
  amount: string;
};

export type RewardsData = {
  rewards: {
    validator_address: string;
    reward: {
      denom: string;
      amount: string;
    }[];
  }[];
  total: {
    denom: string;
    amount: string;
  }[];
};

// type this
// {
//   "unbonding_responses": [
//     {
//       "delegator_address": "string",
//       "validator_address": "string",
//       "entries": [
//         {
//           "creation_height": "string",
//           "completion_time": "2024-08-24T19:16:21.166Z",
//           "initial_balance": "string",
//           "balance": "string",
//           "unbonding_id": "string",
//           "unbonding_on_hold_ref_count": "string"
//         }
//       ]
//     }
//   ],
//   "pagination": {
//     "next_key": "string",
//     "total": "string"
//   }
// }

export type UnbondingData = {
  unbonding_responses: {
    delegator_address: string;
    validator_address: string;
    entries: {
      creation_height: string;
      completion_time: string;
      initial_balance: string;
      balance: string;
      unbonding_id: string;
      unbonding_on_hold_ref_count: string;
    }[];
  }[];
  pagination: {
    next_key: string;
    total: string;
  };
};

export type DelegatorData = {
  validators: {
    operator_address: string;
    consensus_pubkey: {
      type_url: string;
      value: string;
    };
    jailed: boolean;
    status: string;
    tokens: string;
    delegator_shares: string;
    description: {
      moniker: string;
      identity: string;
      website: string;
      security_contact: string;
      details: string;
    };
    unbonding_height: string;
    unbonding_time: string;
    commission: {
      commission_rates: {
        rate: string;
        max_rate: string;
        max_change_rate: string;
      };
      update_time: string;
    };
    min_self_delegation: string;
    unbonding_on_hold_ref_count: string;
    unbonding_ids: string[];
  }[];
  pagination: {
    next_key: string;
    total: string;
  };
};

export type DelegationData = {
  delegation_response: {
    delegation: {
      delegator_address: string;
      validator_address: string;
      shares: string;
    };
    balance: {
      denom: string;
      amount: string;
    };
  };
};