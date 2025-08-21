/**
 * Touch Gesture Handler for Persian Datepicker
 * 
 * Handles touch events, swipe detection, and gesture-based navigation
 */
export class TouchGestureHandler {
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchStartTime: number = 0;
  private isScrolling: boolean = false;
  private canPreventScroll: boolean = true;
  private isDragging: boolean = false;
  private isSwiping: boolean = false;

  constructor(
    private calendar: HTMLElement,
    private onMonthChange: (direction: number) => void,
    private isTransitioning: () => boolean
  ) {
    this.initTouchGestures();
  }

  /**
   * Initialize touch gesture support for the calendar
   */
  private initTouchGestures(): void {
    if (!this.calendar) return;
    
    // Add event listeners with correct passive options
    this.calendar.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.calendar.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.calendar.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    this.calendar.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: true });
    
    // Update CSS to improve touch handling
    this.calendar.style.touchAction = 'pan-y pinch-zoom';
  }

  /**
   * Handle touch start event for swipe detection
   */
  private handleTouchStart(e: TouchEvent): void {
    if (!this.calendar?.classList.contains("visible")) return;
    
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = Date.now();
    this.isScrolling = false;
    this.canPreventScroll = true;
    this.isDragging = true;
    this.isSwiping = false;
  }

  /**
   * Handle touch move event for swipe detection
   */
  private handleTouchMove(e: TouchEvent): void {
    if (!this.calendar?.classList.contains("visible")) return;
    
    if (!this.isDragging || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    
    // Determine if user is trying to scroll vertically
    if (!this.isScrolling) {
      this.isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
    }
    
    // If user is scrolling vertically, don't try to prevent default
    if (this.isScrolling) {
      this.canPreventScroll = false;
      return;
    }
    
    // If we haven't determined if this is a swipe yet
    if (!this.isSwiping) {
      // If horizontal movement is greater than vertical and exceeds threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        this.isSwiping = true;
        e.preventDefault(); // Prevent default only if we're swiping
      }
    } else {
      // If we're swiping, prevent default to stop page scrolling
      e.preventDefault();
    }
    
    // Only try to prevent default for significant horizontal swipes
    if (Math.abs(deltaX) > 10 && this.canPreventScroll) {
      try {
        e.preventDefault();
      } catch (err) {
        // If we can't prevent default, mark it for future reference
        this.canPreventScroll = false;
      }
    }
  }

  /**
   * Handle touch end event for swipe detection
   */
  private handleTouchEnd(e: TouchEvent): void {
    if (!this.calendar?.classList.contains("visible") || this.isScrolling) return;
    
    if (!this.isDragging) return;
    
    if (this.isSwiping) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - this.touchStartX;
      
      // If swipe distance is significant enough
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.onMonthChange(-1); // Swipe right -> previous month
        } else {
          this.onMonthChange(1); // Swipe left -> next month
        }
      }
    } else {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - this.touchStartX;
      const touchDuration = Date.now() - this.touchStartTime;
      
      // Process swipe only if:
      // 1. The swipe was fast enough (under 300ms)
      // 2. The distance was significant (over 50px)
      // 3. Not currently transitioning between months
      if (touchDuration < 300 && Math.abs(deltaX) > 50 && !this.isTransitioning()) {
        const isRTL = getComputedStyle(this.calendar).getPropertyValue('--jdp-direction').trim() === 'rtl';
        
        if ((isRTL && deltaX < 0) || (!isRTL && deltaX > 0)) {
          this.onMonthChange(1); // Next month
        } else if ((isRTL && deltaX > 0) || (!isRTL && deltaX < 0)) {
          this.onMonthChange(-1); // Previous month
        }
      }
    }
    
    // Reset touch state
    this.isDragging = false;
    this.isSwiping = false;
  }

  /**
   * Handle touch cancel event
   */
  private handleTouchCancel(): void {
    // Reset touch state
    this.isDragging = false;
    this.isSwiping = false;
    this.isScrolling = false;
    this.canPreventScroll = true;
  }

  /**
   * Prevent touch event propagation on navigation buttons
   */
  static preventTouchPropagation(element: HTMLElement): void {
    element.addEventListener('touchstart', (e: Event) => e.stopPropagation(), { passive: true });
  }

  /**
   * Clean up event listeners
   */
  destroy(): void {
    if (!this.calendar) return;
    
    this.calendar.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.calendar.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.calendar.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    this.calendar.removeEventListener('touchcancel', this.handleTouchCancel.bind(this));
  }
} 