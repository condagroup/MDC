const json = require('./assets/css/variables.json');

const variables = {};

function stringify(variable) {
  if (Array.isArray(variable)) {
    return `(${variable.join(',')})`;
  }
  return `(${Object.keys(variable).join(',')}),(${Object.values(variable).join(',')})`;
}

const variablesKeys = [];
const variablesKeysStr = [];
const variablesKeysMq = [];

Object.entries(json).forEach(([groupKey, groupValue]) => {
  if (typeof groupValue === 'object') {
    const mq = Object.values(groupValue).map((val) => (typeof val === 'object' ? Object.keys(val) : false))[0];
    const mqObj = {};

    variablesKeys.push(groupKey);
    if (mq) {
      if (mq.length > 1) {
        variablesKeysMq.push(groupKey);
      }
      mq.forEach((val) => {
        mqObj[val] = {};
      });
    }

    if (groupKey === 'breakpoint') {
      Object.entries(groupValue).forEach(([varKey, varValue]) => {
        variables[`$${groupKey}-${varKey}`] = varValue;
      });
    }

    Object.entries(groupValue).forEach(([varKey, varValue]) => {
      if (mq) {
        mq.forEach((val) => {
          if (varValue[val]) {
            mqObj[val][varKey] = varValue[val];
          } else mqObj[val][varKey] = varValue;
        });
      } else {
        variables[`$${groupKey}`] = stringify(groupValue);
      }
    });
    if (Object.keys(mqObj).length) {
      const breakpoints = { ...json.breakpoint };
      const missing = Object.keys(breakpoints).filter((key) => !Object.keys(mqObj).includes(key));
      missing.forEach((breakpoint) => delete breakpoints[breakpoint]);
      variables[`$breakpoint-${groupKey}`] = stringify(breakpoints);

      Object.keys(mqObj).forEach((key) => {
        if (key === 'default') {
          variables[`$${groupKey}`] = stringify(mqObj[key]);
        } else {
          variables[`$${groupKey}-${key}`] = stringify(mqObj[key]);
        }
      });
    }
  } else {
    variablesKeysStr.push(groupKey);
    variables[`$${groupKey}`] = groupValue;
  }

  variables.$variables = stringify(variablesKeys);
  variables['$variables-str'] = stringify(variablesKeysStr);
  variables['$variables-mq'] = stringify(variablesKeysMq);
});

module.exports = variables;
