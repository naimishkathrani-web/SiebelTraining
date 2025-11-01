/**
 * Oracle Siebel IP 21.7 Training Material
 * Navigation and Progress Tracking Script
 * Created: October 2025
 */

// Training configuration
const TRAINING_CONFIG = {
  totalPages: 200, // Approximate total pages across all modules
  storagePrefix: 'siebel_training_',
  modules: [
    { id: 'day1_topic1', name: 'Introduction to Oracle Siebel CRM', pages: 25 },
    { id: 'day1_topic2', name: 'Configuring Siebel Applications', pages: 30 },
    { id: 'day1_topic3', name: 'Managing Customer Data', pages: 25 },
    { id: 'day1_practicals', name: 'Day 1 Practicals', pages: 20 },
    { id: 'day2_topic1', name: 'Advanced Features and Optimization', pages: 35 },
    { id: 'day2_topic2', name: 'Reporting and Best Practices', pages: 30 },
    { id: 'day2_practicals', name: 'Day 2 Practicals', pages: 20 }
  ]
};

/**
 * Progress tracking functions
 */
const ProgressTracker = {
  /**
   * Mark a module as completed
   */
  markComplete: function(moduleId) {
    localStorage.setItem(TRAINING_CONFIG.storagePrefix + moduleId, 'completed');
    this.updateProgress();
  },

  /**
   * Mark a module as in progress
   */
  markInProgress: function(moduleId) {
    const currentStatus = localStorage.getItem(TRAINING_CONFIG.storagePrefix + moduleId);
    if (currentStatus !== 'completed') {
      localStorage.setItem(TRAINING_CONFIG.storagePrefix + moduleId, 'in-progress');
    }
    this.updateProgress();
  },

  /**
   * Get module status
   */
  getStatus: function(moduleId) {
    return localStorage.getItem(TRAINING_CONFIG.storagePrefix + moduleId) || 'not-started';
  },

  /**
   * Calculate overall progress percentage
   */
  calculateProgress: function() {
    let completedModules = 0;
    TRAINING_CONFIG.modules.forEach(module => {
      if (this.getStatus(module.id) === 'completed') {
        completedModules++;
      }
    });
    return Math.round((completedModules / TRAINING_CONFIG.modules.length) * 100);
  },

  /**
   * Update progress displays on the page
   */
  updateProgress: function() {
    const percentage = this.calculateProgress();
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
      fill.style.width = percentage + '%';
    });
    
    const progressTexts = document.querySelectorAll('.progress-text');
    progressTexts.forEach(text => {
      text.textContent = percentage + '%';
    });
  },

  /**
   * Reset all progress
   */
  resetProgress: function() {
    if (confirm('Are you sure you want to reset all training progress?')) {
      TRAINING_CONFIG.modules.forEach(module => {
        localStorage.removeItem(TRAINING_CONFIG.storagePrefix + module.id);
      });
      this.updateProgress();
      location.reload();
    }
  }
};

/**
 * Page navigation functions
 */
const PageNavigator = {
  currentPage: 1,
  totalPages: 1,
  
  /**
   * Initialize page navigation
   */
  init: function(currentPageNum, totalPagesNum) {
    this.currentPage = currentPageNum;
    this.totalPages = totalPagesNum;
    this.updatePageDisplay();
    this.attachEventListeners();
  },

  /**
   * Update page number display
   */
  updatePageDisplay: function() {
    const pageDisplays = document.querySelectorAll('.page-number-display');
    pageDisplays.forEach(display => {
      display.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
    });
  },

  /**
   * Navigate to next page
   */
  nextPage: function() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.showPage(this.currentPage);
      this.scrollToTop();
    }
  },

  /**
   * Navigate to previous page
   */
  prevPage: function() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.showPage(this.currentPage);
      this.scrollToTop();
    }
  },

  /**
   * Show specific page
   */
  showPage: function(pageNum) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
      page.style.display = 'none';
      page.classList.remove('active');
    });

    // Show requested page
    const targetPage = document.getElementById(`page-${pageNum}`);
    if (targetPage) {
      targetPage.style.display = 'block';
      targetPage.classList.add('active');
      this.currentPage = pageNum;
      this.updatePageDisplay();
      this.updateNavigationButtons();
    }
  },

  /**
   * Update navigation button states
   */
  updateNavigationButtons: function() {
    const prevButtons = document.querySelectorAll('.btn-prev');
    const nextButtons = document.querySelectorAll('.btn-next');

    prevButtons.forEach(btn => {
      btn.disabled = this.currentPage === 1;
    });

    nextButtons.forEach(btn => {
      btn.disabled = this.currentPage === this.totalPages;
    });
  },

  /**
   * Scroll to top of page
   */
  scrollToTop: function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Attach keyboard navigation
   */
  attachEventListeners: function() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && this.currentPage < this.totalPages) {
        this.nextPage();
      } else if (e.key === 'ArrowLeft' && this.currentPage > 1) {
        this.prevPage();
      }
    });

    // Attach button click handlers
    document.querySelectorAll('.btn-prev').forEach(btn => {
      btn.addEventListener('click', () => this.prevPage());
    });

    document.querySelectorAll('.btn-next').forEach(btn => {
      btn.addEventListener('click', () => this.nextPage());
    });
  }
};

/**
 * Search functionality
 */
const SearchHelper = {
  /**
   * Initialize search
   */
  init: function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
    }
  },

  /**
   * Perform search across content
   */
  performSearch: function(query) {
    if (query.length < 3) {
      this.clearSearchResults();
      return;
    }

    const results = [];
    const pages = document.querySelectorAll('.page-content');
    
    pages.forEach((page, index) => {
      const content = page.textContent.toLowerCase();
      if (content.includes(query.toLowerCase())) {
        results.push({
          pageNum: index + 1,
          title: page.querySelector('h1, h2')?.textContent || `Page ${index + 1}`
        });
      }
    });

    this.displaySearchResults(results, query);
  },

  /**
   * Display search results
   */
  displaySearchResults: function(results, query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p class="meta">No results found</p>';
      return;
    }

    let html = `<p class="meta">Found ${results.length} result(s) for "${query}":</p><ul>`;
    results.forEach(result => {
      html += `<li><a href="#" onclick="PageNavigator.showPage(${result.pageNum}); return false;">${result.title}</a></li>`;
    });
    html += '</ul>';
    resultsContainer.innerHTML = html;
  },

  /**
   * Clear search results
   */
  clearSearchResults: function() {
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }
  }
};

/**
 * Trainee identification
 */
const TraineeHelper = {
  /**
   * Get current trainee ID from URL or storage
   */
  getTraineeId: function() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTrainee = urlParams.get('trainee');
    
    if (urlTrainee) {
      localStorage.setItem(TRAINING_CONFIG.storagePrefix + 'trainee_id', urlTrainee);
      return urlTrainee;
    }
    
    return localStorage.getItem(TRAINING_CONFIG.storagePrefix + 'trainee_id') || 'trainee1';
  },

  /**
   * Set trainee ID
   */
  setTraineeId: function(traineeId) {
    localStorage.setItem(TRAINING_CONFIG.storagePrefix + 'trainee_id', traineeId);
  },

  /**
   * Display trainee badge
   */
  displayTraineeBadge: function() {
    const traineeId = this.getTraineeId();
    const badges = document.querySelectorAll('.trainee-badge');
    badges.forEach(badge => {
      badge.textContent = traineeId.toUpperCase();
    });
  }
};

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Update progress
  ProgressTracker.updateProgress();
  
  // Display trainee info
  TraineeHelper.displayTraineeBadge();
  
  // Initialize search if available
  SearchHelper.init();
  
  // Mark current module as in progress if on a module page
  const moduleId = document.body.dataset.moduleId;
  if (moduleId) {
    ProgressTracker.markInProgress(moduleId);
  }
  
  // Show completion button on last page of each module
  const isLastPage = document.body.dataset.isLastPage === 'true';
  if (isLastPage && moduleId) {
    const completeBtn = document.getElementById('mark-complete-btn');
    if (completeBtn) {
      completeBtn.style.display = 'inline-block';
      completeBtn.addEventListener('click', function() {
        ProgressTracker.markComplete(moduleId);
        alert('Module marked as complete! Great job!');
        window.location.href = 'index.html';
      });
    }
  }
});

/**
 * Export for use in HTML
 */
window.ProgressTracker = ProgressTracker;
window.PageNavigator = PageNavigator;
window.SearchHelper = SearchHelper;
window.TraineeHelper = TraineeHelper;
