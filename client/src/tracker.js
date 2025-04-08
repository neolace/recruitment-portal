(function() {
  const TRACKING_ID = "tester-platform";
  const API_ENDPOINT = "https://api.talentboozt.com/api/track";

  function getSessionId() {
    let session = sessionStorage.getItem("session_id");
    if (!session) {
      session = "sess_" + Math.random().toString(36).substring(2);
      sessionStorage.setItem("session_id", session);
    }
    return session;
  }

  function getUserDetails() {
    return {
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      browser: navigator.userAgent,
      language: navigator.language,
    };
  }

  function sendEvent(eventType, additionalData = {}) {
    const data = {
      tracking_id: TRACKING_ID,
      event_type: eventType,
      url: window.location.pathname,
      referrer: document.referrer || "direct",
      session_id: getSessionId(),
      timestamp: new Date().toISOString(),
      ...getUserDetails(),
      ...additionalData
    };

    // Send event with fetch and Basic Auth header
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .catch(error => {
        console.error("Error sending tracking data:", error);
      });
  }

  function trackPageView() {
    sendEvent("page_view");
  }

  function trackClicks() {
    document.addEventListener("click", function(event) {
      if (event.target) {
        sendEvent("click", {
          element_id: event.target.id || null,
          element_text: event.target.innerText.substring(0, 50),
          element_type: event.target.tagName.toLowerCase()
        });
      }
    });
  }

  // Initialize tracking
  trackPageView();
  trackClicks();
})();
