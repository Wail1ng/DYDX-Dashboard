export type BalanceData = {
  balance: {
    amount: string;
    denom: string;
  };
};

export type AddressWallet = {
  address: string;
};

/* export type StakingData = {
  delegation_responses: Delegation[];
  staked?: {
    totalStaked: number;
    validators: Validator[];
  };
}; */

/* export type Delegation = {
  balance: {
    amount: string;
  };
  delegation: {
    validator_address: string;
  };
}; */

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


export interface CumulatedBalance {
  timestamp: string;
  totalDelegation: number;
}

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

export interface FormattedStaking {
  totalStaked: string;
  validators: Array<{
    validatorAddress: string;
    amount: string;
    shares: string;
  }>;
}
export interface FormattedBalance {
  amount: string;
  denom: string;
}

// test
export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};

export type ApiError = {
  message: string;
  code: string;
  status?: number;
};

export type Delegation = {
  delegator_address: string;
  validator_address: string;
  shares: string;
}

export type Balance = {
  denom: string;
  amount: string;
}

export type DelegationResponse = {
  delegation: Delegation;
  balance: Balance;
}

export type Pagination = {
  next_key: string | null;
  total: string;
}

export type StakingData = {
  delegation_responses: DelegationResponse[];
  pagination: Pagination;
}

export type UnbondingData = {
  unbonding_responses: UnbondingResponse[];
  pagination: Pagination;
}

export type UnbondingResponse = {
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
}
export type Validator = {
  operator_address: string;
  consensus_pubkey: {
    "@type": string;
    key: string;
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
  };
  min_self_delegation: string;
  unbonding_on_hold_ref_count: string;
  unbonding_ids: string[];
}
export type ValidatorsData = {
  validators: Validator[];
  pagination: Pagination;
}
export type ValidatorData = {
  delegation_response: DelegationResponse;
  balance: Balance;
}
export type AllBalanceData = {
  balances: Balance[];
  pagination: Pagination;
}
export type Reward = {
  denom: string;
  amount: string;
}
export type RewardsData = {
  rewards: Reward[];
  total: Reward[];
}