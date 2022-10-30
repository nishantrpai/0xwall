# 0xwall

Paywall a specific link within website that can only be unlocked **IF** a specific transaction on Ethereum exists between reader and owner.

For e.g., you want to give away first 2 chapters of your book, but want to paywall other chapters of your book.

```
📦 book.com
 ┣ 📜 /chapter1
 ┣ 📜 /chapter2
 ┣ 🦊 /chapter3
 ┣ 🦊 /chapter4
 ┣ 🦊 /chapter5
 ┗ 🦊 /chapter6
```

## How to use

### Writer

If you want to paywall a link:

1. Go to https://0xwall.app/login

2. Login with metamask

3. Go to links

4. Add tier

5. Add links in the tier, pricing and other details. Make sure that the domain is the same as link for e.g.,

Links:
book.com/chapter1
book.com/chapter2

Domain will be:
book.com

6. Go to your website source code.

7. Paste this in the `<head>` tag:

```
  <script src="https://0xwall.app/api/extension" defer></script>
```

#### Carrd

1. Go to the editor of your Carrd website and add an "Embed" component.

2. Change the type to "Code" and give it any name that you want.

3. Paste the above script

That should be it.

**Video:**

[e_oseku](https://twitter.com/e_oseku) made a detailed [walk through](https://www.youtube.com/watch?v=QVI6SVj0Aqc) to integrate with your Carrd website.

#### Webflow

1. Go to dashboard.

2. To sites.

3. Select your website.

4. Paste the script in custom code.

**Video:**

[MT Jack](https://twitter.com/mtjack9) made a [walk-through](https://twitter.com/mtjack9/status/1579536799814537217) you can follow that.

PS: He did it while sipping coffee

#### Next.js

1. Go to `_document.js`

2. Paste script, you'll have to add `async` attribute. [Source](https://developer.chrome.com/blog/script-component/#sequencing-third-party-scripts-without-a-framework-component)

#### Ghost

1. In the "Menu", click "Settings", and then "Code Injection".

2. Add script to the "Site Header" text box. Code added into the "Site Header" field is injected into the <head> tag on every page of your site.

3. After adding the script, click on the "Save" button.

### Reader

If you run into a website that is paywalled by 0xwall:

If you see the pay button, author will allow access to the link only when there is a transaction done

1. Press the pay button

2. Metmask opens up asking you to authorize the transaction

3. 🔴 Read the transaction details carefully. Don't press confirm if you are not sure, discuss with the author if you have **any** concerns.

4. Authorize the transaction if you feel it is safe.

### Bonus

Bonus feature that no one asked, but I felt it would be great to have is token based paywalling.

The mechanics are mostly same:

- For writers, they have to choose type: `token` in transactions, `contract address` and minimum `token balance` (can't be 0).

- For readers, the links will automatically unlock if the `token` is in your wallet. You **don't** have to press any pay button.

One thing for writers while using tokens is, you won't see any transactions in the Reader section.

### Q/A

1. Do I need to do KYC or present any legal document to get started?

None. Just need a metamask wallet to authenticate.

2. Is this service free?

First 10 links are free, then it is 0.007 ETH/link (price may change).

3. Will you give few free link if I am a friend?

Yes 😉

4. What does the database architecture look like? Are you storing personal data?

None.

This is the database architecture I am using. (Pasted from original notes)

_paywall_writer_links_
| writer_account | link | tier_id |
| --- | --- | --- |
| e_oseku_addr | hacktags.carrd.co/1 | 1 |
| e_oseku_addr | hacktags.carrd.co/2 | 2 |

_paywall_link_tiers_
| writer_account | id | name | domain | type | price | contract_addr | token_balance |
| -- | -- | --- | --- | --- | --- | --- | --- |
| e_oseku | 1 | chapter 1 | hacktags.carrd.co | tx | 0.02 | (for nft type,later) | |
| e_oseku | 2 | chapter 2 | hacktags.carrd.co | tx | 0.1 | (for nft type,later) | |

_paywall_reader_tx_
| reader_account | tier_id | tx | created_at |
| --- | --- | --- | --- |
| nishant_addr | 1 | 0x..9 | |

_paywall_my_payments_
| writer_account | service_tier | tx |
| --- | --- | --- |
| e_oseku_addr | 20 | - |
