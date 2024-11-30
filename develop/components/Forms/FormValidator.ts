export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class FormValidator {
  private rules: Map<string, ValidationRule> = new Map();

  public addRule(fieldName: string, rule: ValidationRule): void {
    this.rules.set(fieldName, rule);
  }

  public validateField(fieldName: string, value: any): ValidationResult {
    const rule = this.rules.get(fieldName);
    if (!rule) {
      return { isValid: true, errors: [] };
    }

    const errors: string[] = [];

    // Required validation
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors.push(`${fieldName} is required`);
    }

    // Skip other validations if value is empty and not required
    if (!value && !rule.required) {
      return { isValid: true, errors: [] };
    }

    // Min length validation
    if (rule.minLength && value.toString().length < rule.minLength) {
      errors.push(`${fieldName} must be at least ${rule.minLength} characters`);
    }

    // Max length validation
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      errors.push(`${fieldName} must not exceed ${rule.maxLength} characters`);
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      errors.push(`${fieldName} format is invalid`);
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public validateForm(formData: Record<string, any>): ValidationResult {
    const allErrors: string[] = [];

    for (const [fieldName, value] of Object.entries(formData)) {
      const result = this.validateField(fieldName, value);
      allErrors.push(...result.errors);
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
    };
  }

  public static createEmailRule(): ValidationRule {
    return {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };
  }

  public static createPhoneRule(): ValidationRule {
    return {
      pattern: /^\+?[\d\s\-\(\)]+$/,
    };
  }

  public static createPasswordRule(): ValidationRule {
    return {
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    };
  }
}

export default FormValidator;
