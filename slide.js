class SlideJS {
  constructor(options = {}) {
    this.options = {
      sidebarSelector: "#sidebar",
      triggerSelector: "#sidebarToggle",
      mainContentSelector: "#mainContent",
      collapsedClass: "collapsed",
      ...options,
    };

    this.sidebar = document.querySelector(this.options.sidebarSelector);
    this.mainContent = document.querySelector(this.options.mainContentSelector);
    this.isCollapsed = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAutoCollapse();
  }

  setupEventListeners() {
    // Toggle sidebar on trigger click
    const trigger = document.querySelector(this.options.triggerSelector);
    if (trigger) {
      trigger.addEventListener("click", () => this.toggleSidebar());
    }

    // Auto-expand on hover when collapsed
    if (this.sidebar) {
      this.sidebar.addEventListener("mouseenter", () => {
        if (this.isCollapsed) {
          this.expandSidebar();
        }
      });

      this.sidebar.addEventListener("mouseleave", () => {
        if (this.isCollapsed) {
          this.collapseSidebar();
        }
      });
    }

    // Handle window resize
    window.addEventListener("resize", () => this.handleResize());
  }

  setupAutoCollapse() {
    // Auto-collapse on mobile devices
    if (window.innerWidth <= 768) {
      this.collapseSidebar();
    }
  }

  toggleSidebar() {
    if (this.isCollapsed) {
      this.expandSidebar();
    } else {
      this.collapseSidebar();
    }
  }

  collapseSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add(this.options.collapsedClass);
      this.isCollapsed = true;

      // Trigger custom event
      this.sidebar.dispatchEvent(new CustomEvent("sidebar:collapsed"));
    }
  }

  expandSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove(this.options.collapsedClass);
      this.isCollapsed = false;

      // Trigger custom event
      this.sidebar.dispatchEvent(new CustomEvent("sidebar:expanded"));
    }
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.collapseSidebar();
    } else if (window.innerWidth > 768 && this.isCollapsed) {
      this.expandSidebar();
    }
  }

  // Public API
  collapse() {
    this.collapseSidebar();
  }

  expand() {
    this.expandSidebar();
  }

  toggle() {
    this.toggleSidebar();
  }

  getState() {
    return {
      isCollapsed: this.isCollapsed,
      sidebarWidth: this.isCollapsed ? "70px" : "145px",
    };
  }
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = SlideJS;
}

// Global instantiation
window.SlideJS = SlideJS;
