# 01 — Tokenomics

Status: D-02, D-03, D-04 are DECIDED. The issuance schedule (subsidy, halving) is PROPOSED (P-01, P-03). See [00 — Decision Record](00-decision-record.md).

## 1. Supply

| Allocation | Amount (SAC) | Share | Tag |
| --- | ---: | ---: | --- |
| Mining (block subsidy) | 18,900,000 | 90% | DECIDED amount, PROPOSED mechanism |
| Founder reserve | 2,100,000 | 10% | DECIDED |
| **Maximum supply** | **21,000,000** | 100% | DECIDED |

- Unit: 1 SAC = 100,000,000 units (8 decimals). Maximum supply is 2,100,000,000,000,000 units.
- No SAC can exist outside these two allocations. No one can mint more.

## 2. Founder reserve

- Amount: 2,100,000 SAC.
- Locked for 2 years, then 5% per month: 105,000 SAC per month, 20 releases, total exactly 2,100,000.
- The reserve gives no consensus power and no control over any other coin (D-05).

### Release schedule (PROPOSED implementation, P-05)

Use block heights, not dates, because the chain cannot know calendar time reliably. With a 10-minute target block time: 144 blocks per day, one "month" = 30 days = 4,320 blocks.

| Release | Height | Approx. time from genesis | Units unlocked |
| --- | ---: | --- | ---: |
| 1 | 103,680 | 24 months | 10,500,000,000,000 |
| 2 | 108,000 | 25 months | 10,500,000,000,000 |
| … | +4,320 each | … | … |
| 20 | 185,760 | about 3 years 7 months (43 months) | 10,500,000,000,000 |

Rules for the implementation:

1. The 20 outputs are created at genesis, each with a height timelock (CLTV-style).
2. The reserve address is published before launch so anyone can verify it.
3. There is no admin key and no override: the schedule cannot be shortened by anyone.
4. Heights are only approximately calendar time. If hashrate drops, blocks come slower and the lock lasts longer in real time. This is a property to disclose, not hide.

## 3. Mining issuance (PROPOSED, P-01 / P-03)

All mining SAC is paid to the block's miner as the block subsidy.

| Parameter | Value |
| --- | --- |
| Target block time | 10 minutes (P-02) |
| Halving interval | 210,000 blocks (about 4 years) |
| Initial subsidy | 45 SAC |
| Check | 2 × 210,000 × 45 = 18,900,000 SAC |

| Epoch | Block range | Subsidy | Issued in epoch |
| ---: | --- | ---: | ---: |
| 1 | 1 – 210,000 | 45 SAC | 9,450,000 |
| 2 | 210,001 – 420,000 | 22.5 SAC | 4,725,000 |
| 3 | 420,001 – 630,000 | 11.25 SAC | 2,362,500 |
| 4 | 630,001 – 840,000 | 5.625 SAC | 1,181,250 |
| … | continues halving | … | … |

The subsidy is computed by right-shifting an integer, as Bitcoin does. Because of integer rounding after about the 10th halving, the real total is **18,899,999.979 SAC** (0.021 SAC below 18.9M; verified by calculation). The practical maximum supply is therefore 20,999,999.979 SAC. This is expected and should be stated in the whitepaper.

### What this means for circulation

- First 2 years (105,000 blocks): about 4,725,000 SAC mined, which is 25% of mining supply. The reserve is still locked.
- At month 24: mining yields about 194,400 SAC per 30 days, and the first 105,000 SAC reserve release is about 54% of that month's mining. At full unlock the reserve is about 10% of total supply at maturity but a much larger share of early circulating supply. Publish this schedule openly so no one is surprised.

## 4. Fees

Transaction fees go to the miner of the block that includes the transaction. Fee policy and minimum relay fee are OPEN (O-04). Long term, fees replace the subsidy as the miner incentive.

## 5. What SAC is not

There is no promise of price, listing, return, or redemption. See [05 — Security and Legal](05-security-and-legal.md).
