/**
 * Onchange:
 * 1. Onchange this function will be passed with value and type
 * 2. If value is not valid an error state in input shall be showed
 * Onsubmit:
 * 1. Ideally if there is any error the submit button will be disabled.
 * 2. In case someone changes it using html It'll validate before making api calls
 */

export const linkPattern = new RegExp(
  "^" + // invalidate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-*a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$", // validate fragment locator
  "i"
);

export const addressPattern = new RegExp(/^0x[a-fA-F0-9]{40}$/i);

export const domainPattern = new RegExp(
  /^(?:(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/i
);

export const numberPattern = new RegExp(/\d+/i);

export const validateValue = (name, value) => {
  let isValidValue = true;
  switch (name) {
    case "domain":
      isValidValue = domainPattern.test(value);
      break;
    case "link":
      isValidValue = linkPattern.test(value);
      break;
    case "name":
      isValidValue = value.length > 0;
      break;
    case "contract_addr":
      isValidValue = addressPattern.test(value);
      break;
    case "token_balance":
      isValidValue = numberPattern.test(value);
      break;
    case "tx_period":
      isValidValue = numberPattern.test(value) || !value.length;
      break;
    default:
      isValidValue = true;
      break;
  }
  return isValidValue;
};

export const validateFormData = (tierData) => {
  if (
    !tierData.name ||
    !domainPattern.test(tierData.domain) ||
    !tierData.links.length ||
    (tierData.type == "tx" && !tierData.price) ||
    (tierData.type == "token" && !tierData.contract_addr) ||
    (tierData.type == "token" && !tierData.token_balance) ||
    !(numberPattern.test(tierData.tx_period) || !tierData.tx_period?.length)
  ) {
    return false;
  }

  return true;
};
