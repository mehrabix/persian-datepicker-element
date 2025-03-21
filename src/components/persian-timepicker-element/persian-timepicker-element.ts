import { 
  PersianTimePickerElementOptions, 
  PersianTimeChangeEvent,
  CSSVariableMap
} from './types';

// Import the CSS as a string
const styles = `:host {
  /* Color scheme */
  --jtp-primary: #0891b2;
  --jtp-primary-hover: #0e7490;
  --jtp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jtp-background: #ffffff;
  --jtp-foreground: #1e293b;
  --jtp-muted: #f1f5f9;
  --jtp-muted-foreground: #64748b;
  --jtp-border: #e2e8f0;
  --jtp-ring: #0284c7;
  
  /* Typography */
  --jtp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --jtp-font-size: 14px;
  --jtp-line-height: 1.5;
  --jtp-font-weight: 400;
  
  /* Input field */
  --jtp-input-padding-x: 14px;
  --jtp-input-padding-y: 10px;
  --jtp-input-border-width: 1px;
  --jtp-input-border-color: var(--jtp-border);
  --jtp-input-border-radius: var(--jtp-border-radius);
  --jtp-input-focus-ring-width: 2px;
  --jtp-input-focus-ring-color: rgba(2, 132, 199, 0.25);
  
  /* Popup */
  --jtp-popup-width: 220px;
  --jtp-popup-padding: 16px;
  --jtp-popup-border-width: 1px;
  --jtp-popup-border-color: var(--jtp-border);
  --jtp-popup-border-radius: var(--jtp-border-radius);
  --jtp-popup-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  --jtp-popup-z-index: 10;
  
  /* Spinner buttons */
  --jtp-spinner-button-size: 24px;
  --jtp-spinner-button-bg: var(--jtp-muted);
  --jtp-spinner-button-bg-hover: var(--jtp-border);
  --jtp-spinner-button-border-radius: var(--jtp-border-radius);
  
  /* Animations */
  --jtp-transition-duration: 0.2s;
  --jtp-fade-from-y: -4px;
  
  /* Layout */
  --jtp-border-radius: 0.5rem;
  --jtp-direction: rtl;
}

* {
  box-sizing: border-box;
  direction: var(--jtp-direction);
}

.picker-container {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--jtp-font-family);
  font-size: var(--jtp-font-size);
  line-height: var(--jtp-line-height);
  font-weight: var(--jtp-font-weight);
}

input {
  width: 100%;
  padding: var(--jtp-input-padding-y) var(--jtp-input-padding-x);
  border-radius: var(--jtp-input-border-radius);
  border: var(--jtp-input-border-width) solid var(--jtp-input-border-color);
  font-size: var(--jtp-font-size);
  line-height: var(--jtp-line-height);
  font-family: inherit;
  background-color: var(--jtp-background);
  color: var(--jtp-foreground);
  cursor: pointer;
  outline: none;
  transition: all var(--jtp-transition-duration) ease;
  text-align: center;
}

input:focus {
  border-color: var(--jtp-ring);
  box-shadow: 0 0 0 var(--jtp-input-focus-ring-width) var(--jtp-input-focus-ring-color);
}

.popup {
  display: none;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: var(--jtp-popup-width);
  background: var(--jtp-background);
  border: var(--jtp-popup-border-width) solid var(--jtp-popup-border-color);
  border-radius: var(--jtp-popup-border-radius);
  box-shadow: var(--jtp-popup-shadow);
  padding: var(--jtp-popup-padding);
  text-align: center;
  z-index: var(--jtp-popup-z-index);
}

.popup.visible {
  display: block;
  animation: fadeIn var(--jtp-transition-duration) ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(var(--jtp-fade-from-y)); }
  to { opacity: 1; transform: translateY(0); }
}

.time-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-label {
  font-size: 12px;
  color: var(--jtp-muted-foreground);
  margin-bottom: 5px;
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner-value {
  padding: 5px 10px;
  min-width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.spinner-button {
  width: var(--jtp-spinner-button-size);
  height: var(--jtp-spinner-button-size);
  background: var(--jtp-spinner-button-bg);
  border: none;
  border-radius: var(--jtp-spinner-button-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--jtp-transition-duration) ease;
}

.spinner-button:hover {
  background: var(--jtp-spinner-button-bg-hover);
}

.colon {
  font-size: 18px;
  font-weight: 500;
  margin: 0 5px;
  align-self: center;
  padding-top: 15px;
}

.am-pm-toggle {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.am-pm-option {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: var(--jtp-border-radius);
  transition: background var(--jtp-transition-duration) ease;
}

.am-pm-option.selected {
  background: var(--jtp-primary);
  color: var(--jtp-primary-foreground);
}
`;

/**
 * Persian Time Picker Web Component
 * 
 * A customizable time picker component with Persian language support.
 * 
 * Usage:
 * ```html
 * <!-- Basic usage -->
 * <persian-timepicker-element></persian-timepicker-element>
 * 
 * <!-- With attributes -->
 * <persian-timepicker-element use-24-hours="true" show-seconds="true"></persian-timepicker-element>
 * 
 * <!-- With styling customization -->
 * <persian-timepicker-element style="--jtp-primary: #3b82f6;"></persian-timepicker-element>
 * ```
 * 
 * @element persian-timepicker-element
 */
export class PersianTimePickerElement extends HTMLElement {
  private input: HTMLInputElement;
  private popup: HTMLDivElement;
  private hour: number = 12;
  private minute: number = 0;
  private second: number = 0;
  private isAM: boolean = true;
  private options: PersianTimePickerElementOptions;

  static get observedAttributes() {
    return [
      'placeholder', 
      'use-24-hours',
      'use-24-hour-format',
      'show-seconds',
      'rtl', 
      'default-time',
      'hour',
      'minute',
      'second',
      'disabled',
      'label',
      // CSS variable attributes
      'primary-color', 
      'primary-hover',
      'background-color',
      'foreground-color',
      'border-color',
      'border-radius',
      'font-family'
    ];
  }

  constructor(options: PersianTimePickerElementOptions = {}) {
    super();
    this.options = options;
    
    // Normalize options to support both naming conventions
    if (options.use24HourFormat !== undefined) {
      options.use24Hours = options.use24HourFormat;
    }
    
    const shadow = this.attachShadow({ mode: "open" });

    // Create the component's HTML structure
    this.render(shadow);

    // Apply any custom CSS variables provided in options
    if (options.cssVariables) {
      this.applyCustomCssVariables(options.cssVariables);
    }

    // Get DOM references
    this.input = shadow.getElementById("time-input") as HTMLInputElement;
    this.popup = shadow.getElementById("popup") as HTMLDivElement;

    // Set default values based on options
    this.use24Hours = options.use24Hours ?? false;
    this.showSeconds = options.showSeconds ?? false;
    
    // Set placeholder if provided in options
    if (this.options.placeholder) {
      this.input.placeholder = this.options.placeholder;
    }

    // Set default time if provided
    if (this.options.defaultTime) {
      this.setTimeFromString(this.options.defaultTime);
    }

    // Event listeners
    this.input.addEventListener("click", () => this.togglePopup());

    // Close popup when clicking outside
    document.addEventListener("click", this.handleClickOutside);

    // Setup spinner handlers
    this.setupTimeSpinners(shadow);
  }

  /**
   * Called when the element is inserted into the DOM
   */
  connectedCallback() {
    // Handle initial attribute values
    const hourAttr = this.getAttribute('hour');
    const minuteAttr = this.getAttribute('minute');
    const secondAttr = this.getAttribute('second');
    
    if (hourAttr !== null) {
      const hourVal = parseInt(hourAttr, 10);
      if (!isNaN(hourVal)) {
        this.hour = hourVal;
      }
    }
    
    if (minuteAttr !== null) {
      const minuteVal = parseInt(minuteAttr, 10);
      if (!isNaN(minuteVal)) {
        this.minute = minuteVal;
      }
    }
    
    if (secondAttr !== null) {
      const secondVal = parseInt(secondAttr, 10);
      if (!isNaN(secondVal)) {
        this.second = secondVal;
      }
    }
    
    // Update the display with initial values
    this.updateDisplay();
  }

  /**
   * Called when the element is removed from the DOM
   */
  disconnectedCallback() {
    // Remove event listeners to avoid memory leaks
    document.removeEventListener('click', this.handleClickOutside);
  }

  // Reference to handleClickOutside for disconnectedCallback
  private handleClickOutside = (e: MouseEvent) => {
    if (!e.composedPath().includes(this) && this.popup.classList.contains("visible")) {
      this.togglePopup();
    }
  };

  /**
   * Apply custom CSS variables to the component
   */
  private applyCustomCssVariables(variables: CSSVariableMap): void {
    if (!variables) return;
    
    Object.entries(variables).forEach(([key, value]) => {
      this.style.setProperty(key, value);
    });
  }

  // Handle attribute changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    // Map of attribute names to CSS variable names
    const cssVarMap: Record<string, string> = {
      'primary-color': '--jtp-primary',
      'primary-hover': '--jtp-primary-hover',
      'background-color': '--jtp-background',
      'foreground-color': '--jtp-foreground',
      'border-color': '--jtp-border',
      'border-radius': '--jtp-border-radius',
      'font-family': '--jtp-font-family'
    };
    
    switch (name) {
      case 'placeholder':
        if (this.input) this.input.placeholder = newValue;
        break;
      case 'use-24-hours':
      case 'use-24-hour-format':
        this.use24Hours = newValue !== null && newValue !== 'false';
        this.updateDisplay();
        break;
      case 'show-seconds':
        this.showSeconds = newValue !== null && newValue !== 'false';
        this.updateDisplay();
        break;
      case 'rtl':
        if (this.shadowRoot) {
          const rtl = newValue !== null && newValue !== 'false';
          (this as unknown as HTMLElement).style.setProperty('--jtp-direction', rtl ? 'rtl' : 'ltr');
        }
        break;
      case 'default-time':
        if (newValue) {
          this.setTimeFromString(newValue);
        }
        break;
      case 'hour':
        if (newValue) {
          const hourVal = parseInt(newValue, 10);
          if (!isNaN(hourVal)) {
            this.hour = hourVal;
            this.updateDisplay();
          }
        }
        break;
      case 'minute':
        if (newValue) {
          const minuteVal = parseInt(newValue, 10);
          if (!isNaN(minuteVal)) {
            this.minute = minuteVal;
            this.updateDisplay();
          }
        }
        break;
      case 'second':
        if (newValue) {
          const secondVal = parseInt(newValue, 10);
          if (!isNaN(secondVal)) {
            this.second = secondVal;
            this.updateDisplay();
          }
        }
        break;
      case 'disabled':
        if (this.input) {
          this.input.disabled = newValue !== null && newValue !== 'false';
        }
        break;
      case 'label':
        // Handle label if a label element is implemented
        break;
      default:
        // Handle CSS variable attributes
        if (cssVarMap[name] && this.shadowRoot) {
          (this as unknown as HTMLElement).style.setProperty(cssVarMap[name], newValue);
        }
        break;
    }
  }

  private render(shadow: ShadowRoot) {
    shadow.innerHTML = `
      <style>${styles}</style>
      <div class="picker-container">
        <input type="text" id="time-input" readonly placeholder="انتخاب زمان">
        <div class="popup" id="popup">
          <div class="time-inputs">
            <div class="time-unit">
              <div class="time-label">ساعت</div>
              <div class="spinner">
                <button class="spinner-button" id="hour-up">▲</button>
                <div class="spinner-value" id="hour-value">12</div>
                <button class="spinner-button" id="hour-down">▼</button>
              </div>
            </div>
            
            <div class="colon">:</div>
            
            <div class="time-unit">
              <div class="time-label">دقیقه</div>
              <div class="spinner">
                <button class="spinner-button" id="minute-up">▲</button>
                <div class="spinner-value" id="minute-value">00</div>
                <button class="spinner-button" id="minute-down">▼</button>
              </div>
            </div>
            
            <div id="seconds-container" style="display: none;">
              <div class="colon">:</div>
              <div class="time-unit">
                <div class="time-label">ثانیه</div>
                <div class="spinner">
                  <button class="spinner-button" id="second-up">▲</button>
                  <div class="spinner-value" id="second-value">00</div>
                  <button class="spinner-button" id="second-down">▼</button>
                </div>
              </div>
            </div>
            
            <div class="am-pm-toggle" id="am-pm-toggle">
              <div class="am-pm-option selected" id="am-option">ق.ظ</div>
              <div class="am-pm-option" id="pm-option">ب.ظ</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private setupTimeSpinners(shadow: ShadowRoot) {
    // Hour spinner
    shadow.getElementById("hour-up")!.addEventListener("click", () => this.incrementHour());
    shadow.getElementById("hour-down")!.addEventListener("click", () => this.decrementHour());
    
    // Minute spinner
    shadow.getElementById("minute-up")!.addEventListener("click", () => this.incrementMinute());
    shadow.getElementById("minute-down")!.addEventListener("click", () => this.decrementMinute());
    
    // Second spinner
    shadow.getElementById("second-up")!.addEventListener("click", () => this.incrementSecond());
    shadow.getElementById("second-down")!.addEventListener("click", () => this.decrementSecond());
    
    // AM/PM toggle
    shadow.getElementById("am-option")!.addEventListener("click", () => this.setAMPM(true));
    shadow.getElementById("pm-option")!.addEventListener("click", () => this.setAMPM(false));

    // Apply initial display state
    this.updateDisplay();
  }

  togglePopup() {
    this.popup.classList.toggle("visible");
  }

  // Getters and setters for attributes
  
  get use24Hours(): boolean {
    return this.options.use24Hours ?? this.hasAttribute('use-24-hours');
  }
  
  set use24Hours(value: boolean) {
    this.options.use24Hours = value;
    
    if (value) {
      this.setAttribute('use-24-hours', '');
      if (this.shadowRoot) {
        this.shadowRoot.getElementById('am-pm-toggle')!.style.display = 'none';
        
        // Convert 12h time to 24h if needed
        if (!this.isAM && this.hour < 12) {
          this.hour += 12;
        } else if (this.isAM && this.hour === 12) {
          this.hour = 0;
        }
      }
    } else {
      this.removeAttribute('use-24-hours');
      if (this.shadowRoot) {
        this.shadowRoot.getElementById('am-pm-toggle')!.style.display = 'flex';
        
        // Convert 24h time to 12h
        if (this.hour >= 12) {
          this.isAM = false;
          this.hour = this.hour === 12 ? 12 : this.hour - 12;
        } else {
          this.isAM = true;
          this.hour = this.hour === 0 ? 12 : this.hour;
        }
        
        this.setAMPM(this.isAM);
      }
    }
    
    this.updateDisplay();
  }
  
  get showSeconds(): boolean {
    return this.options.showSeconds ?? this.hasAttribute('show-seconds');
  }
  
  set showSeconds(value: boolean) {
    this.options.showSeconds = value;
    
    if (value) {
      this.setAttribute('show-seconds', '');
      if (this.shadowRoot) {
        this.shadowRoot.getElementById('seconds-container')!.style.display = 'flex';
      }
    } else {
      this.removeAttribute('show-seconds');
      if (this.shadowRoot) {
        this.shadowRoot.getElementById('seconds-container')!.style.display = 'none';
      }
    }
    
    this.updateDisplay();
  }

  // Time manipulation methods
  
  incrementHour() {
    if (this.use24Hours) {
      this.hour = (this.hour + 1) % 24;
    } else {
      this.hour = (this.hour % 12) + 1; // 12-hour format: 1-12
    }
    this.updateDisplay();
  }
  
  decrementHour() {
    if (this.use24Hours) {
      this.hour = (this.hour + 23) % 24; // +23 is same as -1 in modulo 24
    } else {
      this.hour = this.hour === 1 ? 12 : this.hour - 1;
    }
    this.updateDisplay();
  }
  
  incrementMinute() {
    this.minute = (this.minute + 1) % 60;
    this.updateDisplay();
  }
  
  decrementMinute() {
    this.minute = (this.minute + 59) % 60; // +59 is same as -1 in modulo 60
    this.updateDisplay();
  }
  
  incrementSecond() {
    this.second = (this.second + 1) % 60;
    this.updateDisplay();
  }
  
  decrementSecond() {
    this.second = (this.second + 59) % 60; // +59 is same as -1 in modulo 60
    this.updateDisplay();
  }
  
  setAMPM(isAM: boolean) {
    this.isAM = isAM;
    
    if (this.shadowRoot) {
      const amOption = this.shadowRoot.getElementById('am-option')!;
      const pmOption = this.shadowRoot.getElementById('pm-option')!;
      
      if (isAM) {
        amOption.classList.add('selected');
        pmOption.classList.remove('selected');
      } else {
        amOption.classList.remove('selected');
        pmOption.classList.add('selected');
      }
    }
    
    this.updateDisplay();
  }

  updateDisplay() {
    if (!this.shadowRoot) return;
    
    // Update hour display
    const hourValue = this.shadowRoot.getElementById('hour-value')!;
    hourValue.textContent = this.hour.toString().padStart(2, '0');
    
    // Update minute display
    const minuteValue = this.shadowRoot.getElementById('minute-value')!;
    minuteValue.textContent = this.minute.toString().padStart(2, '0');
    
    // Update second display
    const secondValue = this.shadowRoot.getElementById('second-value')!;
    secondValue.textContent = this.second.toString().padStart(2, '0');
    
    // Update input value
    this.formatAndSetValue();
  }

  private formatAndSetValue() {
    let displayHour = this.hour;
    let amPmText = '';
    
    // Handle 12/24 hour format
    if (!this.use24Hours) {
      amPmText = this.isAM ? ' ق.ظ' : ' ب.ظ';
    }
    
    // Format time as HH:MM:SS or HH:MM based on showSeconds
    let formattedTime = `${displayHour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}`;
    
    if (this.showSeconds) {
      formattedTime += `:${this.second.toString().padStart(2, '0')}`;
    }
    
    // Add AM/PM if using 12-hour format
    formattedTime += amPmText;
    
    this.input.value = formattedTime;
    
    // Dispatch timeChange event (renamed from 'change' to 'timeChange')
    this.dispatchEvent(new CustomEvent("timeChange", {
      detail: {
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        timeString: formattedTime,
        isAM: !this.use24Hours ? this.isAM : undefined
      },
      bubbles: true
    }));
  }

  private setTimeFromString(timeString: string) {
    // Parse time string (HH:MM:SS, HH:MM, or with AM/PM)
    const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?(?:\s*(ق\.ظ|ب\.ظ|AM|PM))?$/i;
    const match = timeString.match(timeRegex);
    
    if (match) {
      let [_, hourStr, minuteStr, secondStr, amPmStr] = match;
      
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const second = secondStr ? parseInt(secondStr, 10) : 0;
      
      // Handle AM/PM
      let isAM = true;
      if (amPmStr) {
        isAM = amPmStr.toLowerCase() === 'am' || amPmStr === 'ق.ظ';
        
        // Adjust hour for PM in 12-hour format
        if (!isAM && hour < 12) {
          hour += 12;
        } else if (isAM && hour === 12) {
          hour = 0;
        }
      }
      
      // Set the values
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      
      // If we're using 12-hour format, convert 24-hour time to 12-hour
      if (!this.use24Hours) {
        this.isAM = hour < 12;
        this.hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour display
        this.setAMPM(this.isAM);
      }
      
      this.updateDisplay();
    }
  }

  /**
   * Sets the time value programmatically
   */
  public setValue(hour: number, minute: number, second: number = 0): void {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    
    // If we're using 12-hour format, convert 24-hour time to 12-hour
    if (!this.use24Hours) {
      this.isAM = hour < 12;
      this.hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour display
      this.setAMPM(this.isAM);
    }
    
    this.updateDisplay();
  }

  /**
   * Gets the current time as an object
   */
  public getValue(): { hour: number; minute: number; second: number; isAM?: boolean } {
    const hour = this.use24Hours ? this.hour : (this.isAM ? (this.hour % 12) : (this.hour % 12 + 12));
    
    return {
      hour,
      minute: this.minute,
      second: this.second,
      isAM: this.use24Hours ? undefined : this.isAM
    };
  }

  /**
   * Clears the time selection
   */
  public clear() {
    this.input.value = '';
    this.hour = this.use24Hours ? 0 : 12;
    this.minute = 0;
    this.second = 0;
    this.isAM = true;
    
    if (!this.use24Hours) {
      this.setAMPM(true);
    }
    
    this.updateDisplay();
  }
} 