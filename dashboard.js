// Dashboard Application
class Dashboard {
  constructor() {
    this.slideJS = null;
    this.profilePopup = null;
    this.currentLanguage = "en";
    this.currentTheme = "light";

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.initializeSlideJS();
    this.setupProfilePopup();
    this.setupThemeSwitcher();
    this.setupLanguageSwitcher();
    this.setupNavigationHighlight();
    this.setupCardAnimations();
    this.loadSavedTheme();
    this.loadDashboardData();
  }

  initializeSlideJS() {
    this.slideJS = new SlideJS({
      sidebarSelector: "#sidebar",
      mainContentSelector: "#mainContent",
      collapsedClass: "collapsed",
    });

    // Listen to sidebar events
    const sidebar = document.querySelector("#sidebar");
    if (sidebar) {
      sidebar.addEventListener("sidebar:collapsed", () => {
        console.log("Sidebar collapsed");
        this.adjustProfilePopup();
      });

      sidebar.addEventListener("sidebar:expanded", () => {
        console.log("Sidebar expanded");
        this.adjustProfilePopup();
      });
    }
  }

  setupProfilePopup() {
    const profileAvatar = document.querySelector("#profileAvatar");
    this.profilePopup = document.querySelector("#profilePopup");

    if (profileAvatar && this.profilePopup) {
      profileAvatar.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleProfilePopup();
      });

      // Close popup when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !this.profilePopup.contains(e.target) &&
          !profileAvatar.contains(e.target)
        ) {
          this.hideProfilePopup();
        }
      });

      // Handle popup menu clicks
      const menuItems =
        this.profilePopup.querySelectorAll(".profile-menu-item");
      menuItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const action = item.querySelector("span").textContent.toLowerCase();
          this.handleProfileMenuAction(action);
        });
      });
    }
  }

  toggleProfilePopup() {
    if (this.profilePopup) {
      if (this.profilePopup.classList.contains("show")) {
        this.hideProfilePopup();
      } else {
        this.showProfilePopup();
      }
    }
  }

  showProfilePopup() {
    if (this.profilePopup) {
      this.profilePopup.classList.add("show");

      // Add animation class
      setTimeout(() => {
        this.profilePopup.classList.add("slide-in-up");
      }, 10);
    }
  }

  hideProfilePopup() {
    if (this.profilePopup) {
      this.profilePopup.classList.remove("show", "slide-in-up");
    }
  }

  adjustProfilePopup() {
    if (this.profilePopup && this.slideJS) {
      const state = this.slideJS.getState();
      const leftOffset = state.isCollapsed ? "80px" : "155px";
      this.profilePopup.style.left = leftOffset;
    }
  }

  handleProfileMenuAction(action) {
    switch (action) {
      case "settings":
        this.showNotification("Opening Settings...", "info");
        // Implement settings logic here
        break;
      case "sign out":
        this.showNotification("Signing out...", "warning");
        // Implement sign out logic here
        setTimeout(() => {
          // Redirect to login page
          console.log("Redirecting to login...");
        }, 1500);
        break;
    }
    this.hideProfilePopup();
  }

  setupThemeSwitcher() {
    const themeToggle = document.querySelector("#themeToggle");

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    const body = document.body;
    const themeToggle = document.querySelector("#themeToggle");

    if (theme === "dark") {
      body.classList.add("dark-theme");
      if (themeToggle) {
        themeToggle.classList.add("dark-mode");
      }
      this.showNotification("Switched to Dark Theme", "info");
    } else {
      body.classList.remove("dark-theme");
      if (themeToggle) {
        themeToggle.classList.remove("dark-mode");
      }
      this.showNotification("Switched to Light Theme", "info");
    }

    // Save theme preference
    localStorage.setItem("preferredTheme", theme);
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem("preferredTheme");
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  setupLanguageSwitcher() {
    const languageOptions = document.querySelectorAll(".language-option");

    languageOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedLang = option.dataset.lang;
        this.switchLanguage(selectedLang);

        // Update active state
        languageOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
      });
    });
  }

  switchLanguage(lang) {
    this.currentLanguage = lang;

    // Language switching logic would go here
    if (lang === "ar") {
      // Switch to Arabic
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
      this.showNotification("تم التبديل إلى العربية", "success");
    } else {
      // Switch to English
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
      this.showNotification("Switched to English", "success");
    }

    // Save language preference
    localStorage.setItem("preferredLanguage", lang);
  }

  setupNavigationHighlight() {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove active class from all items
        navItems.forEach((navItem) => navItem.classList.remove("active"));

        // Add active class to clicked item
        item.classList.add("active");

        // Get navigation target
        const label = item
          .querySelector(".nav-label")
          .textContent.toLowerCase();
        this.handleNavigation(label);
      });
    });
  }

  handleNavigation(target) {
    // Navigation logic would go here
    switch (target) {
      case "dashboard":
        this.showNotification("Loading Dashboard...", "info");
        break;
      case "schedule manager":
        this.showNotification("Loading Schedule Manager...", "info");
        break;
      case "employee statistics":
        this.showNotification("Loading Employee Statistics...", "info");
        break;
      case "test scheduler":
        this.showNotification("Loading Test Scheduler...", "info");
        break;
      case "participating departments":
        this.showNotification("Loading Departments...", "info");
        break;
      case "clinic ambulance":
        this.showNotification("Loading Clinic Ambulance...", "info");
        break;
      case "settings":
        this.showNotification("Loading Settings...", "info");
        break;
      case "reports":
        this.showNotification("Loading Reports...", "info");
        break;
    }
  }

  setupCardAnimations() {
    // Animate cards on scroll
    const cards = document.querySelectorAll(".card, .metric-card");
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in-up");
        }
      });
    }, observerOptions);

    cards.forEach((card) => {
      cardObserver.observe(card);
    });
  }

  loadDashboardData() {
    // Simulate loading dashboard data
    this.showLoadingState(true);

    setTimeout(() => {
      this.showLoadingState(false);
      this.animateCounters();
    }, 1000);
  }

  showLoadingState(isLoading) {
    const dashboard = document.querySelector(".dashboard-container");
    if (dashboard) {
      if (isLoading) {
        dashboard.classList.add("loading");
      } else {
        dashboard.classList.remove("loading");
      }
    }
  }

  animateCounters() {
    // Animate percentage counters
    const counters = document.querySelectorAll(".metric-card h2");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent);
      const increment = target / 50;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + "%";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "%";
        }
      };

      updateCounter();
    });
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.zIndex = "9999";
    notification.style.minWidth = "300px";

    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (notification && notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Public API methods
  refresh() {
    this.loadDashboardData();
  }

  toggleSidebar() {
    if (this.slideJS) {
      this.slideJS.toggle();
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Initialize dashboard when DOM is ready
window.dashboard = new Dashboard();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Dashboard;
}

// Utility functions
window.dashboardUtils = {
  formatDate: (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  },

  formatTime: (time) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(time);
  },

  generateRandomData: () => {
    return {
      attendance: Math.floor(Math.random() * 20) + 80,
      averageScore: Math.floor(Math.random() * 30) + 70,
      activities: Math.floor(Math.random() * 50) + 50,
    };
  },
};

// Add some interactive features
document.addEventListener("DOMContentLoaded", function () {
  // Add click handlers for buttons
  const newScheduleBtn = document.querySelector(
    'button:contains("NEW SCHEDULE")'
  );
  if (newScheduleBtn) {
    newScheduleBtn.addEventListener("click", function () {
      window.dashboard.showNotification("Opening Schedule Creator...", "info");
    });
  }

  const viewSchedulesBtn = document.querySelector(
    'button:contains("VIEW SCHEDULES")'
  );
  if (viewSchedulesBtn) {
    viewSchedulesBtn.addEventListener("click", function () {
      window.dashboard.showNotification("Loading All Schedules...", "info");
    });
  }

  // Add hover effects to performer cards
  const performerCards = document.querySelectorAll(".performer-card");
  performerCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});
