const ValidationService = {
  
  validators: {
    
    required(value, fieldName) {
      if (value === null || value === undefined || String(value).trim() === '') {
        throw new Error(`Campo '${fieldName}' é obrigatório.`);
      }
      return true;
    },
    
    type(value, fieldName, expectedType) {
      const actualType = typeof value;
      if (actualType !== expectedType) {
        throw new Error(`Campo '${fieldName}' deve ser do tipo '${expectedType}', mas é '${actualType}'.`);
      }
      return true;
    },
    
    minLength(value, fieldName, min) {
      if (typeof value === 'string' && value.length < min) {
        throw new Error(`Campo '${fieldName}' deve ter pelo menos ${min} caracteres.`);
      }
      return true;
    },
    
    maxLength(value, fieldName, max) {
      if (typeof value === 'string' && value.length > max) {
        throw new Error(`Campo '${fieldName}' não pode ter mais de ${max} caracteres.`);
      }
      return true;
    },
    
    email(value, fieldName) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error(`Campo '${fieldName}' deve ser um e-mail válido.`);
      }
      return true;
    },
    
    inList(value, fieldName, allowedValues) {
      if (!allowedValues.includes(value)) {
        throw new Error(`Campo '${fieldName}' deve ser um dos valores: ${allowedValues.join(', ')}.`);
      }
      return true;
    },
    
    numeric(value, fieldName) {
      if (isNaN(Number(value))) {
        throw new Error(`Campo '${fieldName}' deve ser numérico.`);
      }
      return true;
    },
    
    min(value, fieldName, minValue) {
      if (Number(value) < minValue) {
        throw new Error(`Campo '${fieldName}' deve ser maior ou igual a ${minValue}.`);
      }
      return true;
    },
    
    max(value, fieldName, maxValue) {
      if (Number(value) > maxValue) {
        throw new Error(`Campo '${fieldName}' deve ser menor ou igual a ${maxValue}.`);
      }
      return true;
    },

    noFormula(value, fieldName) {
      if (typeof value === 'string' && /^[=+\-@]/.test(value.trim())) {
        throw new Error(`Campo '${fieldName}' contém um caractere não permitido no início.`);
      }
      return true;
    },

    cpf(value, fieldName) {
      if (value === null || value === undefined || String(value).trim() === '') return true;
      const digits = String(value).replace(/\D/g, '');
      if (!/^\d{11}$/.test(digits)) throw new Error(`Campo '${fieldName}' deve conter 11 dígitos.`);
      if (/^(\d)\1{10}$/.test(digits)) throw new Error(`Campo '${fieldName}' inválido.`);
      const base9 = digits.substring(0, 9);
      const d1 = ValidationService._calcDigito(base9, 10);
      const d2 = ValidationService._calcDigito(base9 + d1, 11);
      if (digits !== base9 + d1.toString() + d2.toString()) {
        throw new Error(`Campo '${fieldName}' inválido.`);
      }
      return true;
    },

    phone(value, fieldName) {
      if (value === null || value === undefined || String(value).trim() === '') return true;
      const digits = String(value).replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        throw new Error(`Campo '${fieldName}' deve ter 10 ou 11 dígitos.`);
      }
      return true;
    },
  },

  _calcDigito(base, fator) {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i], 10) * fator--;
    }
    const resto = total % 11;
    return resto < 2 ? 0 : 11 - resto;
  },
  
  validate(data, rules) {
    const errors = [];
    
    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const value = data[fieldName];
      
      if (!Array.isArray(fieldRules)) {
        errors.push(`Regras para '${fieldName}' devem ser um array.`);
        continue;
      }
      
      for (const rule of fieldRules) {
        try {
          const [validatorName, ...args] = Array.isArray(rule) ? rule : [rule];
          
          const validator = this.validators[validatorName];
          
          if (!validator) {
            errors.push(`Validador '${validatorName}' não existe.`);
            continue;
          }
          
          validator(value, fieldName, ...args);
          
        } catch (error) {
          errors.push(error.message);
        }
      }
    }
    
    if (errors.length > 0) {
      throw new Error(`Erros de validação:\n- ${errors.join('\n- ')}`);
    }
    
    return true;
  },
};